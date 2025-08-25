import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/lib/backend-api';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await backendApi.getUserByEmail(email);

    if (user) {
      return NextResponse.json({ found: true, status: user.status, role: user.role });
    } else {
      return NextResponse.json({ found: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error checking user status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
