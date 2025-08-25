import { NextRequest, NextResponse } from 'next/server';
import { clerkUserSync } from '@/lib/clerk-user-sync';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clerkId, email, firstName, lastName, fullName, imageUrl } = body;

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userData = {
      id: clerkId,
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      fullName: fullName || '',
      imageUrl: imageUrl || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await clerkUserSync.syncUserToBackend(userData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
