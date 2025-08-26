import { NextResponse } from 'next/server';
import connect from '@/app/lib/connect'; // Assuming your DB connection is in the lib folder
import HistoryData from '@/app/models/HistorySchema'; // Assuming your History model is in the models folder

// --- CREATE a new history entry ---
export async function POST(req: Request) {
  try {
    const { id, clerkUserId, template, title, content, totalWords } = await req.json();

    // Basic validation
    if (!clerkUserId || !template || !title || !content) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connect();

    const newHistory = new HistoryData({
      id,
      clerkUserId,
      template,
      title,
      content,
      totalWords,
    });

    // Save the entry to the database
    await newHistory.save();

    return NextResponse.json({
      message: 'History entry successfully created',
      history: newHistory,
    });
  } catch (error) {
    console.error('Error adding history entry:', error);
    return NextResponse.json({ message: 'Error adding history entry' }, { status: 500 });
  }
}

// --- GET all history entries for a user ---
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get('clerkUserId');

    // Simple validation
    if (!clerkUserId) {
      return NextResponse.json({ error: 'clerkUserId is required' }, { status: 400 });
    }

    await connect();

    // Fetch history entries based on clerkUserId
    const historyEntries = await HistoryData.find({ clerkUserId }).sort({ createdAt: -1 });

    return NextResponse.json({
      message: 'History entries retrieved successfully!',
      histories: historyEntries,
    });
  } catch (error) {
    console.error('Error retrieving history entries:', error);
    return NextResponse.json({ message: 'Error retrieving history entries' }, { status: 500 });
  }
}

// --- DELETE a single history entry ---
export async function DELETE(req: Request) {
  try {
    // Get the history id from the query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Simple validation to check if the id is provided
    if (!id) {
      return NextResponse.json({ error: 'History ID is required' }, { status: 400 });
    }

    await connect();

    // Find and delete the history entry based on the id
    const deletedHistory = await HistoryData.findOneAndDelete({ id });

    if (!deletedHistory) {
      return NextResponse.json({ error: 'History entry not found' }, { status: 404 });
    }

    // Return a success message
    return NextResponse.json({
      message: 'History entry successfully deleted',
      deletedHistory,
    });
  } catch (error) {
    console.error('Error deleting history:', error);
    return NextResponse.json({ message: 'Error deleting history entry' }, { status: 500 });
  }
}