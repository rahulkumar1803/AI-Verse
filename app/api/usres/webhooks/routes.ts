
import { Webhook } from "svix";
import { headers } from "next/headers";
import { EmailAddress, WebhookEvent } from "@clerk/nextjs/server";

import User from "@/app/models/UserSchema";
import connect from "@/app/lib/connect";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = (await headerPayload).get("svix-id");
    const svix_timestamp = (await headerPayload).get("svix-timestamp");
    const svix_signature = (await headerPayload).get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occurred — no svix headers", {
            status: 400,
        });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix_id": svix_id,
            "svix_timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error veriging webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses } = evt.data;

        const newUser = {
            clerkUserId: id,
            emaiilAddress: email_addresses[0].email_address,
            isPro: false,
            accumulatedWords: 0,
        };

        try {
            await connect();
            await User.create(newUser);
            console.log("User Created and saved to database:", newUser);
        } catch (error) {
            console.log("Error creating user in database:", error);
        }
    } else if (eventType === "user.deleted") {
        console.log(`user with ID ${id} was deleted.`)
    } else {
        console.log(`Unhandled event type  ${eventType}`);
    }
    console.log(`Webhook with and ID of ${id} and type ${eventType}`);
    console.log("webhook body:", body);

    return new Response("", { status: 200 });

}
