import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import User from '@/app/models/UserSchema';
import connect from '@/app/lib/connect';
import { NextResponse } from 'next/server';

// DO NOT add 'use client' to this file.
// This function must run on the server to access headers and environment variables.

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers using the server-side headers() function
  const headerPayload = req.headers;
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 });
  }

  const eventType = evt.type;
  await connect();

  // --- Handle Events ---

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    try {
      await User.create({
        clerkUserId: id,
        emailAddress: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
        isPro: false,
        accumulatedWords: 0,
      });
      console.log(`✅ User ${id} was created.`);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  if (eventType === 'user.updated') {
    const { id, first_name, last_name, image_url } = evt.data;
    try {
      await User.findOneAndUpdate(
        { clerkUserId: id },
        { 
          firstName: first_name, 
          lastName: last_name,
          imageUrl: image_url,
        },
      );
      console.log(`✅ User ${id} was updated.`);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    if (!id) {
        return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }
    try {
      await User.deleteOne({ clerkUserId: id });
      console.log(`✅ User ${id} was deleted.`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return new Response('', { status: 200 });
}