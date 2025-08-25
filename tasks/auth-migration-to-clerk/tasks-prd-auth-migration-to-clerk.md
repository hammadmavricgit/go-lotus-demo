# Task List: Clerk Authentication Migration

## Relevant Files

- `web/package.json` - Update dependencies to include Clerk SDK
- `web/src/app/layout.tsx` - Add ClerkProvider wrapper
- `web/src/app/auth/page.tsx` - Replace with Clerk SignIn component
- `web/src/app/api/webhooks/clerk/route.ts` - Webhook handler for Clerk events (frontend only)
- `web/src/components/auth/ClerkAuthProvider.tsx` - Custom Clerk provider component
- `web/src/components/auth/ClerkAuthProvider.test.tsx` - Unit tests for Clerk provider
- `web/src/lib/clerk-config.ts` - Clerk configuration utilities
- `web/src/lib/clerk-config.test.ts` - Unit tests for Clerk configuration
- `web/src/middleware.ts` - Update middleware for Clerk authentication
- `web/src/middleware.test.ts` - Unit tests for updated middleware
- `web/src/hooks/useClerkAuth.ts` - Custom hook for Clerk authentication
- `web/src/hooks/useClerkAuth.test.ts` - Unit tests for Clerk auth hook
- `web/src/lib/clerk-user-sync.ts` - Service to sync Clerk users with backend via Apso CRUD
- `web/src/lib/clerk-user-sync.test.ts` - Unit tests for user sync service
- `web/src/lib/backend-api.ts` - API client for Apso-generated Users controller
- `web/src/lib/backend-api.test.ts` - Unit tests for backend API client
- `backend/.apsorc` - Update to add clerkId field to Users entity (only backend change allowed)
- `web/.env.local` - Add Clerk environment variables
- `web/src/app/dashboard/page.tsx` - Update to use Clerk user data
- `web/src/components/layout/UserProfile.tsx` - Update to use Clerk UserButton
- `web/src/components/layout/Sidebar.tsx` - Update navigation for Clerk auth
- `web/src/lib/auth-utils.ts` - Utility functions for Clerk authentication
- `web/src/lib/auth-utils.test.ts` - Unit tests for auth utilities
- `web/src/components/invitations/InviteUserButton.tsx` - Update to use Clerk invitation API
- `web/src/components/invitations/InviteUserButton.test.tsx` - Unit tests for updated invite button

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `ClerkAuthProvider.tsx` and `ClerkAuthProvider.test.tsx` in the same directory).
- Use `npm test` to run tests. Running without a path executes all tests found by the Jest configuration.
- **IMPORTANT**: Backend is read-only - only `.apsorc` file can be modified. All authentication logic must be implemented in frontend.
- APSO generates all CRUD operations automatically - we cannot modify backend controllers/services.
- User data sync happens through frontend calling Apso-generated Users controller endpoints.
- Database schema changes are handled by updating `.apsorc` and running `apso server scaffold`.

## Tasks

- [ ] 1.0 Set up Clerk Configuration and Frontend Integration
  - [ ] 1.1 Create Clerk account and configure application settings
  - [ ] 1.2 Install Clerk SDK dependencies in frontend package.json
  - [x] 1.3 Configure Clerk environment variables in .env.local
  - [x] 1.4 Create Clerk configuration utilities (lib/clerk-config.ts)
  - [x] 1.5 Add ClerkProvider wrapper to app layout
  - [x] 1.6 Replace existing auth page with Clerk SignIn component
  - [x] 1.7 Update middleware to work with Clerk authentication
  - [x] 1.8 Create custom Clerk authentication hook
  - [x] 1.9 Update existing components to use Clerk components
  - [x] 1.10 Test basic Clerk authentication flow

- [ ] 2.0 Update Backend Schema via APSO
  - [x] 2.1 Update .apsorc file to add clerkId field to Users entity
  - [x] 2.2 Remove hashed_password field from .apsorc Users entity
  - [x] 2.3 Validate .apsorc schema structure and field types
  - [x] 2.4 Run `apso server scaffold` to regenerate backend code
  - [x] 2.5 Test that Apso-generated Users controller works with new schema
  - [x] 2.6 Verify database migration was applied correctly

- [ ] 3.0 Implement Frontend User Sync with Backend
  - [x] 3.1 Create backend API client for Apso-generated Users controller
  - [x] 3.2 Create Clerk user sync service to sync data with backend
  - [x] 3.3 Implement webhook handler in frontend for Clerk events
  - [x] 3.4 Add user creation logic when Clerk user signs up
  - [x] 3.5 Add user update logic when Clerk user data changes
  - [x] 3.6 Add user deletion logic when Clerk user is deleted
  - [x] 3.7 Test user sync between Clerk and backend database
  - [x] 3.8 Add error handling and logging for sync operations

- [ ] 4.0 Implement Role-Based Access Control (Frontend Only)
  - [x] 4.1 Create role-based authorization middleware for frontend
  - [x] 4.2 Update user management components to work with Clerk data
  - [x] 4.3 Implement user role management through frontend API calls
  - [x] 4.4 Update navigation to use role-based access control
  - [x] 4.5 Update invitation components to use Clerk invitation API
  - [x] 4.6 Test invitation flow through Clerk dashboard
  - [x] 4.7 Add role validation in protected routes
  - [x] 4.8 Test role-based access control functionality

- [ ] 5.0 Testing, Deployment, and Documentation
  - [x] 5.1 Write comprehensive unit tests for all new frontend components
  - [x] 5.2 Write integration tests for user sync functionality
  - [x] 5.3 Write end-to-end tests for authentication flow
  - [ ] 5.4 Performance testing of user sync operations
  - [ ] 5.5 Security audit of frontend authentication implementation
  - [ ] 5.6 Create production deployment checklist
  - [ ] 5.7 Set up monitoring for user sync operations
  - [ ] 5.8 Update frontend documentation for new authentication flow
  - [ ] 5.9 Create migration guide for existing users
  - [ ] 5.10 Final testing in staging environment 