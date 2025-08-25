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
    const { status } = body;

    // Validate status
    if (!status || !['Active', 'Inactive', 'Delete'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "Active", "Inactive", or "Delete"' },
        { status: 400 }
      );
    }

    // Prevent self-deletion
    const currentUser = await backendApi.getUserByClerkId(userId);
    if (currentUser && currentUser.id === userIdParam && status === 'Delete') {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // If setting to Delete, check if this is the last admin
    if (status === 'Delete') {
      const targetUser = await backendApi.getUserByClerkId(userId);
      if (targetUser && targetUser.role === 'admin') {
        const allUsers = await backendApi.getUsers();
        const adminUsers = allUsers.filter(
          (user) => user.role === 'admin' && user.status === 'Active'
        );

        if (adminUsers.length <= 1) {
          return NextResponse.json(
            { error: 'Cannot delete the last admin user' },
            { status: 400 }
          );
        }
      }
    }

    // Update user status in backend
    const updatedUser = await backendApi.updateUser(userIdParam, { status });

    return NextResponse.json({
      user: updatedUser,
      message: `User status updated to ${status}`,
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
