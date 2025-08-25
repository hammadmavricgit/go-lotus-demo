# API Structure Guidelines

## 📁 Folder Structure

All backend API endpoints should be placed in `src/app/api/` following Next.js 13+ App Router conventions.

### Current API Structure:
```
src/app/api/
├── auth/           # Authentication endpoints
├── users/          # User management endpoints
│   ├── route.ts    # GET /api/users, POST /api/users
│   ├── [id]/       # Dynamic user routes
│   │   ├── route.ts        # GET /api/users/[id], PUT /api/users/[id], DELETE /api/users/[id]
│   │   ├── role/           # User role management
│   │   │   └── route.ts    # PUT /api/users/[id]/role
│   │   └── status/         # User status management
│   │       └── route.ts    # PUT /api/users/[id]/status
│   └── sync/       # User synchronization
│       └── route.ts        # POST /api/users/sync
├── staff/          # Staff management endpoints
└── webhooks/       # Webhook endpoints
```

## 🚫 What NOT to do:
- ❌ Don't create API services in `src/services/` folder
- ❌ Don't create API clients in `src/lib/` (except for backend communication)
- ❌ Don't mix frontend services with API endpoints

## ✅ What to do:
- ✅ Place all API endpoints in `src/app/api/`
- ✅ Use Next.js App Router conventions with `route.ts` files
- ✅ Use dynamic routes with `[param]/` folders
- ✅ Keep API logic in the route handlers
- ✅ Use `src/lib/backend-api.ts` for backend communication

## 🔄 Migration Notes:
- The old `src/services/user-service.ts` has been removed as it was unused
- All user API functionality is now handled through `src/app/api/users/` routes
- Frontend components use these API routes directly via fetch calls

## 📝 Example API Route:
```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // API logic here
    return NextResponse.json({ data: 'success' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## 🔗 Related Files:
- `src/lib/backend-api.ts` - Backend API client for external services
- `src/hooks/useUsers.ts` - Frontend hook for user management
- `src/hooks/useStaff.ts` - Frontend hook for staff management 