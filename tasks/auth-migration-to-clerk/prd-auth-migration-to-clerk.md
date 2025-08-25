# Product Requirements Document: Authentication Migration to Clerk

## Introduction/Overview

This PRD outlines the migration of the authentication system from a custom Prisma-based solution to Clerk, a modern authentication service. The current system uses custom JWT tokens and manual password management, but we need to leverage Clerk's built-in authentication capabilities while maintaining integration with the existing Apso-generated backend CRUD operations.

The goal is to implement a seamless authentication flow where Clerk handles user authentication and session management, while the backend manages user data through the existing Apso-generated Users controller. This approach eliminates the need for custom password hashing, JWT management, and invitation systems while maintaining the existing role-based access control.

## Goals

1. **Implement Clerk Authentication**: Replace custom authentication with Clerk's managed authentication service
2. **Maintain Backend Integration**: Continue using Apso-generated Users controller for user data management
3. **Simplify User Flow**: Use Clerk's built-in invitation system instead of custom invitation management
4. **Preserve Role-Based Access**: Maintain existing admin/staff role system
5. **Webhook Integration**: Automatically sync Clerk user data to the backend database
6. **Embedded UI**: Integrate Clerk components into the existing frontend interface
7. **Fresh Start**: Begin with new users only, no migration of existing user data

## User Stories

1. **As an admin**, I want to invite new users through Clerk's dashboard or API so that they can join the system
2. **As an invited user**, I want to receive an email invitation from Clerk so that I can set up my account
3. **As a user**, I want to click the invitation link and set my password through Clerk so that I can access the application
4. **As a user**, I want to log in using Clerk's embedded components so that I can authenticate securely
5. **As a user**, I want my session to be managed by Clerk so that I don't need to worry about token expiration
6. **As a system administrator**, I want to manage user roles through the backend API so that I can control access permissions
7. **As a developer**, I want user data to be automatically synced from Clerk to the backend so that the system stays consistent

## Functional Requirements

### 1. Clerk Integration

1.1. The system must integrate Clerk authentication service for user management
1.2. The system must disable public sign-up in Clerk to enforce invitation-only registration
1.3. The system must use Clerk's built-in invitation system for user onboarding
1.4. The system must embed Clerk components in the existing frontend UI
1.5. The system must use Clerk's session management instead of custom JWT tokens

### 2. Backend User Management

2.1. The system must use the existing Apso-generated Users controller for CRUD operations
2.2. The system must add a `clerkId` field to the users table to link Clerk users with database users
2.3. The system must create user records in the backend database when users accept Clerk invitations
2.4. The system must maintain existing role-based access control (admin/staff)
2.5. The system must preserve the existing user status system (Active/Inactive/Delete)

### 3. Webhook Integration

3.1. The system must implement Clerk webhooks to sync user data changes
3.2. The system must handle user creation events from Clerk webhooks
3.3. The system must handle user update events from Clerk webhooks
3.4. The system must handle user deletion events from Clerk webhooks
3.5. The system must validate webhook signatures for security

### 4. User Invitation Flow

4.1. The system must allow admins to invite users through Clerk's API or dashboard
4.2. The system must send invitation emails through Clerk's email service
4.3. The system must provide secure invitation links that redirect to Clerk's sign-up flow
4.4. The system must automatically create user records when invitations are accepted
5.5. The system must assign default roles (staff) to newly created users

### 5. Authentication Flow

5.1. The system must use Clerk's embedded components for login/signup
5.2. The system must validate user sessions using Clerk's session management
5.3. The system must redirect authenticated users to appropriate pages based on their role
5.4. The system must handle authentication errors gracefully
5.5. The system must provide logout functionality through Clerk

### 6. API Endpoints

6.1. The system must provide webhook endpoint `/api/webhooks/clerk` for Clerk events
6.2. The system must maintain existing Users CRUD endpoints from Apso backend
6.3. The system must provide user role management endpoints
6.4. The system must provide user status management endpoints
6.5. The system must provide user profile endpoints that work with Clerk data

### 7. Error Handling

7.1. The system must handle Clerk API errors gracefully
7.2. The system must handle webhook processing errors with proper logging
7.3. The system must provide user-friendly error messages for authentication failures
7.4. The system must handle network connectivity issues with Clerk services

## Non-Goals (Out of Scope)

1. **Custom Authentication**: The system will not implement custom JWT tokens or password hashing
2. **Custom Invitation System**: The system will not maintain the existing custom invitation flow
3. **Password Management**: The system will not handle password storage or validation
4. **Existing User Migration**: The system will not migrate existing user data to Clerk
5. **Custom Email Service**: The system will not implement custom email sending for invitations
6. **Social Authentication**: The system will not implement OAuth or social login providers
7. **Two-Factor Authentication**: The system will not implement 2FA beyond what Clerk provides
8. **Custom Session Management**: The system will not implement custom session handling

## Design Considerations

### Database Schema Updates

- Add `clerkId` field to the existing `users` table to link with Clerk users
- Remove `hashed_password` field as Clerk handles password management
- Maintain existing fields: `id`, `email`, `firstName`, `lastName`, `status`, `role`, `created_at`, `updated_at`
- Keep existing enum values for `UsersStatusEnum` and `UsersRoleEnum`

### Frontend Integration

- Embed Clerk's `<SignIn />` and `<SignUp />` components in existing pages
- Use Clerk's `<UserButton />` component for user profile management
- Implement Clerk's `<ClerkProvider />` wrapper for the application
- Use Clerk's hooks (`useUser`, `useAuth`) for authentication state

### Backend Integration

- Continue using Apso-generated Users controller for CRUD operations
- Implement webhook handler for Clerk events
- Use Clerk's server-side SDK for user validation
- Maintain existing role-based authorization logic

### API Route Structure

```
/api/
├── webhooks/
│   └── clerk/route.ts
└── users/ (existing Apso-generated endpoints)
    ├── GET / - List users
    ├── POST / - Create user
    ├── GET /:id - Get user
    ├── PUT /:id - Update user
    └── DELETE /:id - Delete user
```

## Technical Considerations

### Clerk Configuration

- **Environment Variables**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk's publishable key
  - `CLERK_SECRET_KEY`: Clerk's secret key for server-side operations
  - `CLERK_WEBHOOK_SECRET`: Secret for webhook signature validation
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Sign-in page URL
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Sign-up page URL
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Redirect after sign-in
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: Redirect after sign-up

### Webhook Events to Handle

- `user.created`: Create user record in backend database
- `user.updated`: Update user record in backend database
- `user.deleted`: Mark user as deleted in backend database
- `email_address.created`: Update user email if needed
- `email_address.updated`: Update user email if needed

### Security Implementation

- **Webhook Validation**: Verify webhook signatures using Clerk's secret
- **Clerk Session Validation**: Use Clerk's server-side SDK for session validation
- **Role-Based Authorization**: Maintain existing role checks in backend
- **Input Validation**: Validate all user inputs using existing validation

### Dependencies

- `@clerk/nextjs`: Clerk's Next.js SDK
- `@clerk/backend`: Clerk's server-side SDK
- Existing Apso-generated backend dependencies
- `zod` for webhook payload validation

## Success Metrics

1. **Zero Downtime**: Complete migration without service interruption
2. **Feature Parity**: All existing authentication features work through Clerk
3. **Performance**: Authentication response times remain under 200ms
4. **Security**: No security vulnerabilities introduced during migration
5. **Data Consistency**: User data remains synchronized between Clerk and backend
6. **Error Rate**: Authentication error rate remains below 1%
7. **User Experience**: Seamless authentication flow with embedded Clerk components

## Open Questions

1. **Clerk Plan**: Which Clerk plan should be used (Free, Pro, or Enterprise)?
2. **Custom Domains**: Should we use custom domains for Clerk authentication pages?
3. **Email Templates**: Should we customize Clerk's email templates for invitations?
4. **User Attributes**: What additional user attributes should be synced from Clerk to backend?
5. **Rate Limiting**: What rate limiting should be applied to webhook endpoints?
6. **Monitoring**: How should we monitor Clerk integration and webhook processing?
7. **Testing Strategy**: What level of testing is required for Clerk integration?

## Implementation Phases

### Phase 1: Clerk Setup & Frontend Integration (Week 1)

- Set up Clerk account and configure application
- Install and configure Clerk SDK in Next.js frontend
- Embed Clerk components in existing authentication pages
- Configure Clerk environment variables and routing

### Phase 2: Backend Integration & Webhooks (Week 2)

- Implement webhook handler for Clerk events
- Update Users entity to include `clerkId` field
- Create database migration for schema changes
- Implement user creation/update logic in webhooks

### Phase 3: User Management & Role System (Week 3)

- Implement role-based access control with Clerk
- Create user management endpoints that work with Clerk data
- Test invitation flow through Clerk dashboard/API
- Implement user status management

### Phase 4: Testing & Deployment (Week 4)

- Comprehensive testing of authentication flow
- Performance testing and optimization
- Security audit of webhook implementation
- Production deployment and monitoring setup

## Risk Mitigation

1. **Clerk Service Dependency**: Implement fallback authentication strategy
2. **Webhook Reliability**: Implement webhook retry logic and error handling
3. **Data Synchronization**: Implement data consistency checks between Clerk and backend
4. **User Experience**: Gradual rollout with feature flags
5. **Security**: Regular security audits of webhook implementation

## Deliverables

1. **Clerk Integration**: Complete Clerk SDK integration in frontend
2. **Webhook Handler**: Robust webhook processing for Clerk events
3. **Database Migration**: Schema updates to support Clerk integration
4. **User Management**: Updated user management endpoints
5. **Authentication Components**: Embedded Clerk components in existing UI
6. **Testing Suite**: Comprehensive tests for Clerk integration
7. **Documentation**: Integration guide and API documentation
8. **Monitoring Setup**: Webhook monitoring and error tracking

## Migration Checklist

- [ ] Set up Clerk account and application
- [ ] Install Clerk SDK in frontend
- [ ] Configure Clerk environment variables
- [ ] Embed Clerk components in authentication pages
- [ ] Implement webhook handler
- [ ] Update database schema with `clerkId` field
- [ ] Test invitation flow through Clerk
- [ ] Implement role-based access control
- [ ] Test user creation and management
- [ ] Deploy to production
- [ ] Monitor webhook processing
- [ ] Update documentation
