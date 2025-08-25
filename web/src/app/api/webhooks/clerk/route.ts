import { NextRequest, NextResponse } from 'next/server';
import { clerkUserSync } from '@/lib/clerk-user-sync';

/**
 * Clerk Webhook Handler
 * Receives webhook events from Clerk and processes them
 */

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { type, data } = payload;

    console.log('Received Clerk webhook event:', type);

    // TODO: Add webhook signature verification
    // const signature = request.headers.get('svix-signature');
    // const timestamp = request.headers.get('svix-timestamp');
    // const id = request.headers.get('svix-id');

    switch (type) {
      case 'user.created':
        await clerkUserSync.handleUserCreated(data);
        break;
      case 'user.updated':
        await clerkUserSync.handleUserUpdated(data);
        break;
      case 'user.deleted':
        await clerkUserSync.handleUserDeleted(data.id);
        break;
      case 'email.created':
      case 'email.updated':
        // Handle email updates
        if (data.email_address) {
          await clerkUserSync.handleEmailUpdated(
            data.user_id,
            data.email_address
          );
        }
        break;
      default:
        console.log('Unhandled webhook event type:', type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Clerk webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Clerk webhook endpoint is active' });
}
