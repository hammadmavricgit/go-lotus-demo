import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { backendApi } from '@/lib/backend-api';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const userIdParam = parseInt(resolvedParams.id);
    if (isNaN(userIdParam)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const body = await request.json();
    const { role } = body;

    // Validate role
    if (!role || !['admin', 'staff'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be "admin" or "staff"' },
        { status: 400 }
      );
    }

    // If changing from admin to staff, check if this is the last admin
    if (role === 'staff') {
      const currentUser = await backendApi.getUserByClerkId(userId);
      if (
        currentUser &&
        currentUser.id === userIdParam &&
        currentUser.role === 'admin'
      ) {
        // Check if this is the last admin user
        const allUsers = await backendApi.getUsers();
        const adminUsers = allUsers.filter(
          (user) => user.role === 'admin' && user.status === 'Active'
        );

        if (adminUsers.length <= 1) {
          return NextResponse.json(
            { error: 'Cannot demote the last admin user' },
            { status: 400 }
          );
        }
      }
    }

    // Update user role in backend
    const updatedUser = await backendApi.updateUser(userIdParam, { role });

    return NextResponse.json({
      user: updatedUser,
      message: `User role updated to ${role}`,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
