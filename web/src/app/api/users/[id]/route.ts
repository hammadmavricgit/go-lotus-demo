import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { backendApi } from '@/lib/backend-api';

export async function GET(
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

    // Get query parameters from the request
    const { searchParams } = new URL(request.url);
    const backendUrl = new URL(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
      }/Users/${userIdParam}`
    );

    // Forward query parameters (like join) to backend
    searchParams.forEach((value, key) => {
      backendUrl.searchParams.set(key, value);
    });

    // Get user from backend
    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const user = await response.json();
    
    // Map backend field names back to frontend field names
    const frontendUser = {
      ...user,
      ...(user.primary_phone !== undefined && {
        primaryPhone: user.primary_phone,
      }),
      ...(user.date_of_birth !== undefined && {
        dateOfBirth: user.date_of_birth,
      }),
      ...(user.work_phone !== undefined && {
        workPhone: user.work_phone,
      }),
      ...(user.home_phone !== undefined && {
        homePhone: user.home_phone,
      }),
      ...(user.social_security_number !== undefined && {
        socialSecurityNumber: user.social_security_number,
      }),
      ...(user.zip_code !== undefined && {
        zipCode: user.zip_code,
      }),
      ...(user.image_url !== undefined && {
        imageUrl: user.image_url,
      }),
    };

    return NextResponse.json({ user: frontendUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    // Validate required fields (email is always required)
    if (body.email && (!body.email || body.email.trim() === '')) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Map frontend field names to backend field names for the fields that differ
    const backendBody = {
      ...body,
      // Map frontend camelCase to backend snake_case where needed
      ...(body.primaryPhone !== undefined && {
        primary_phone: body.primaryPhone,
      }),
      ...(body.dateOfBirth !== undefined && {
        date_of_birth: body.dateOfBirth,
      }),
      ...(body.workPhone !== undefined && { work_phone: body.workPhone }),
      ...(body.homePhone !== undefined && { home_phone: body.homePhone }),
      ...(body.socialSecurityNumber !== undefined && {
        social_security_number: body.socialSecurityNumber,
      }),
      ...(body.zipCode !== undefined && { zip_code: body.zipCode }),
      ...(body.imageUrl !== undefined && { image_url: body.imageUrl }),
    };

    // Remove frontend-only field names that don't match backend
    delete backendBody.primaryPhone;
    delete backendBody.dateOfBirth;
    delete backendBody.workPhone;
    delete backendBody.homePhone;
    delete backendBody.socialSecurityNumber;
    delete backendBody.zipCode;
    delete backendBody.imageUrl;

    // Update user in backend directly
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
      }/Users/${userIdParam}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const updatedUser = await response.json();

    // Map backend field names back to frontend field names
    const frontendUser = {
      ...updatedUser,
      ...(updatedUser.primary_phone !== undefined && {
        primaryPhone: updatedUser.primary_phone,
      }),
      ...(updatedUser.date_of_birth !== undefined && {
        dateOfBirth: updatedUser.date_of_birth,
      }),
      ...(updatedUser.work_phone !== undefined && {
        workPhone: updatedUser.work_phone,
      }),
      ...(updatedUser.home_phone !== undefined && {
        homePhone: updatedUser.home_phone,
      }),
      ...(updatedUser.social_security_number !== undefined && {
        socialSecurityNumber: updatedUser.social_security_number,
      }),
      ...(updatedUser.zip_code !== undefined && {
        zipCode: updatedUser.zip_code,
      }),
      ...(updatedUser.image_url !== undefined && {
        imageUrl: updatedUser.image_url,
      }),
    };

    return NextResponse.json({ user: frontendUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    // Delete user from backend
    await backendApi.deleteUser(userIdParam);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
