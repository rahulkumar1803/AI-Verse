import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import connect from "@/app/lib/connect"; // Corrected path assuming lib folder
import User from "@/app/models/UserSchema"; // Corrected path assuming models folder

// GET /api/users?clerkId=<clerkUserId>
// This function gets a user from your DB, or creates one if they don't exist.
export async function GET(req: Request) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const clerkId = searchParams.get("clerkId");

        if (!clerkId) {
            return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
        }

        // 1. Try to find the user in your local database first.
        let user = await User.findOne({ clerkUserId: clerkId });

        // 2. If not found, fetch their data from Clerk's API and create them in your DB.
        if (!user) {
            // This is the correct way to fetch a user from Clerk's API on the server.
            const client = await clerkClient(); // 1. Call the function to get the client instance
            const clerkUser = await client.users.getUser(clerkId); // 2. Now use the instance

            user = await User.create({
                clerkUserId: clerkId,
                emailAddress: clerkUser.emailAddresses?.[0]?.emailAddress || "",
                // Provide fallbacks in case these fields are not set in the Clerk profile.
                firstName: clerkUser.firstName || "",
                lastName: clerkUser.lastName || "",
                isPro: false,
                accumulatedWords: 0,
                imageUrl: clerkUser.imageUrl || "",
            });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("GET /api/users error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/users -> Create new user manually if needed
export async function POST(req: Request) {
    try {
        await connect();
        const body = await req.json();
        const { clerkUserId, emailAddress, firstName, lastName } = body;

        if (!clerkUserId || !emailAddress) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ clerkUserId });
        if (existingUser) {
            return NextResponse.json(existingUser, { status: 200 });
        }

        const newUser = await User.create({
            clerkUserId,
            emailAddress,
            firstName: firstName || "",
            lastName: lastName || "",
            isPro: false,
            accumulatedWords: 0,
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("POST /api/users error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// Add this entire function to handle the PUT request from your frontend.
export async function PUT(req: Request) {
  try {
    // 1. Get the data from the request body
    const { id, accumulatedWords } = await req.json();

    // 2. Validate the incoming data
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // The accumulatedWords can be 0, so we check for undefined
    if (accumulatedWords === undefined) {
      return NextResponse.json({ error: 'accumulatedWords is required' }, { status: 400 });
    }

    // 3. Connect to the database
    await connect();

    // 4. Find the user and update their word count
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: id },
      { accumulatedWords: accumulatedWords },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 5. Return a successful response
    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error('[API_USERS_PUT_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}