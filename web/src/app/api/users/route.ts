import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { backendApi } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';
    const filter = searchParams.get('filter') || '';
    const clerkId = searchParams.get('clerkId') || '';

    // Build backend URL with filters
    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/Users`
    );

    // Add pagination
    backendUrl.searchParams.set('page', page.toString());
    backendUrl.searchParams.set('limit', limit.toString());

    // If clerkId is provided, use it for filtering
    if (clerkId) {
      console.log('Filtering by clerkId:', clerkId);
      backendUrl.searchParams.set('filter', `clerkId||eq||${clerkId}`);
    }
    // If a direct filter is provided, use it (for other filtering)
    else if (filter) {
      backendUrl.searchParams.set('filter', filter);
    } else {
      // Add search filter if provided
      if (search) {
        // Use search parameter with OR logic for firstName and lastName
        const searchQuery = {
          $or: [
            { firstName: { $contL: search } },
            { lastName: { $contL: search } },
          ],
        };
        backendUrl.searchParams.set('s', JSON.stringify(searchQuery));

        // Add role and status as filter conditions
        if (role && role !== 'all') {
          const roleFilter = `role||eq||${role}`;
          backendUrl.searchParams.append('filter', roleFilter);
        }

        if (status && status !== 'all') {
          const backendStatus = status === 'Current' ? 'Active' : 'Inactive';
          const statusFilter = `status||eq||${backendStatus}`;
          backendUrl.searchParams.append('filter', statusFilter);
        }
      } else {
        // No search - use filter conditions only
        if (role && role !== 'all') {
          const roleFilter = `role||eq||${role}`;
          backendUrl.searchParams.set('filter', roleFilter);
        }

        if (status && status !== 'all') {
          const statusFilter = `status||eq||${status}`;
          if (role && role !== 'all') {
            backendUrl.searchParams.append('filter', statusFilter);
          } else {
            backendUrl.searchParams.set('filter', statusFilter);
          }
        }
      }
    }

    // Fetch users from backend
    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Backend response:', data);

    // Map backend field names back to frontend field names for each user
    const mappedUsers = (data.data || []).map((user: any) => ({
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
    }));

    return NextResponse.json({
      users: mappedUsers,
      total: data.total || 0,
      page: data.page || page,
      pageCount: data.pageCount || 1,
      limit: data.limit || limit,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();

    // Map frontend field names to backend field names
    const backendBody = {
      ...body,
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

    // Remove frontend-only field names
    delete backendBody.primaryPhone;
    delete backendBody.dateOfBirth;
    delete backendBody.workPhone;
    delete backendBody.homePhone;
    delete backendBody.socialSecurityNumber;
    delete backendBody.zipCode;
    delete backendBody.imageUrl;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/Users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Map backend field names back to frontend field names
    const frontendUser = {
      ...data,
      ...(data.primary_phone !== undefined && {
        primaryPhone: data.primary_phone,
      }),
      ...(data.date_of_birth !== undefined && {
        dateOfBirth: data.date_of_birth,
      }),
      ...(data.work_phone !== undefined && {
        workPhone: data.work_phone,
      }),
      ...(data.home_phone !== undefined && {
        homePhone: data.home_phone,
      }),
      ...(data.social_security_number !== undefined && {
        socialSecurityNumber: data.social_security_number,
      }),
      ...(data.zip_code !== undefined && {
        zipCode: data.zip_code,
      }),
      ...(data.image_url !== undefined && {
        imageUrl: data.image_url,
      }),
    };

    return NextResponse.json({ user: frontendUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

