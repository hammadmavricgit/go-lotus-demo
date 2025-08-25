# Product Requirements Document: Enhanced Clerk-Based Staff Management System

## Introduction/Overview

This document outlines the requirements for enhancing the existing Clerk-based staff management system in the Next.js 15 application. The system already has basic Clerk authentication, user invitation via Clerk's API, and role-based access control. This enhancement will add comprehensive user management features, improved dashboards, and integrated staff listing functionality.

The system leverages Clerk for authentication and invitation management while maintaining user data and role management in the backend database through the existing Apso-generated Users controller.

## Goals

1. **Enhanced Admin Dashboard**: Provide comprehensive user management capabilities for admin users
2. **Role-Based User Experience**: Deliver tailored dashboards for admin vs staff users
3. **User Management APIs**: Enable admins to manage user roles, status, and permissions
4. **Integrated Staff Listing**: Connect the staff listing page with the dashboard navigation
5. **Clerk Integration**: Leverage Clerk's invitation system while maintaining backend data integrity
6. **Seamless User Sync**: Ensure real-time synchronization between Clerk and backend database

## User Stories

### Admin User Stories

1. **As an admin**, I want to invite staff members through Clerk so that they receive professional invitation emails
2. **As an admin**, I want to view all users (admin and staff) in a comprehensive list so that I can manage the team
3. **As an admin**, I want to change user roles (admin/staff) so that I can promote or demote team members
4. **As an admin**, I want to update user status (Active/Inactive) so that I can control access without deleting accounts
5. **As an admin**, I want to access the staff listing page from my dashboard so that I can manage staff information
6. **As an admin**, I want to see detailed user information including Clerk data and backend data so that I have complete visibility
7. **As an admin**, I want to resend invitations to pending users so that I can follow up on incomplete registrations
8. **As an admin**, I want to delete/deactivate users so that I can remove access when needed

### Staff User Stories

9. **As a staff member**, I want to see a personalized dashboard so that I can access my work-related features
10. **As a staff member**, I want to update my profile information so that my details stay current
11. **As a staff member**, I should NOT see user management features so that the interface remains clean and appropriate
12. **As a staff member**, I want to access staff directory features so that I can view team information (if permitted)

### General User Stories

13. **As a user**, I want my Clerk profile changes to automatically sync to the backend so that data remains consistent
14. **As a user**, I want clear feedback when actions succeed or fail so that I understand the system status
15. **As a user**, I want fast loading and responsive interfaces so that the system is efficient to use

## Functional Requirements

### 1. Enhanced User Management API

#### Get All Users (`GET /api/users`)

- Return all users from backend database with pagination
- Include user role, status, Clerk sync status, and last login
- Filter by role (admin/staff) and status (Active/Inactive/Delete)
- Search by name, email
- Admin access only

#### Update User Role (`PUT /api/users/[id]/role`)

- Allow admin users to update user roles (admin/staff)
- Validate that at least one admin user remains in the system
- Log role changes for audit trail
- Admin access only

#### Update User Status (`PUT /api/users/[id]/status`)

- Allow admin users to update user status (Active/Inactive/Delete)
- Handle soft delete (status: Delete) vs hard delete
- Prevent self-deletion by admin users
- Admin access only

#### Get User Details (`GET /api/users/[id]`)

- Return complete user information (Clerk + backend data)
- Include role, status, invitation history, last login
- Admin access for all users, staff access for own profile only

#### Sync User from Clerk (`POST /api/users/[id]/sync`)

- Force sync specific user data from Clerk to backend
- Handle cases where Clerk user exists but backend user doesn't
- Admin access only

### 2. Enhanced Clerk Integration

#### Webhook Event Handling (`POST /api/webhooks/clerk`)

- Handle user.created, user.updated, user.deleted events
- Handle session.created for last login tracking
- Handle email.updated for email changes
- Ensure idempotent processing of webhook events

#### Invitation Management via Clerk

- Use Clerk's invitation API for sending invitations
- Track invitation status in backend database
- Handle invitation acceptance events
- Default new users to 'staff' role with 'Active' status

### 3. Role-Based Dashboard Components

#### Admin Dashboard Features

- **User Management Section**: Table of all users with management actions
- **Staff Invitation**: Enhanced invitation form with role assignment
- **System Analytics**: User counts, recent activities, invitation metrics
- **Quick Actions**: Bulk user operations, system settings
- **Navigation**: Access to staff listing, user management, system settings

#### Staff Dashboard Features

- **Personal Profile**: View and edit own profile information
- **Team Directory**: View staff directory (if permissions allow)
- **Work Features**: Access to work-related functionality
- **Limited Navigation**: No access to user management or admin features

### 4. Integrated Staff Management

#### Staff Listing Integration

- Add staff listing page to dashboard navigation for admin users
- Connect staff data with user management system
- Enable role/status updates directly from staff listing
- Show Clerk sync status for each staff member

#### User Profile Integration

- Connect user profiles with Clerk user data
- Show last login, registration date, invitation history
- Enable profile updates that sync to both Clerk and backend

### 5. Database Schema Enhancements

#### Users Table Updates (existing)

- `id` (primary key, UUID)
- `email` (required, unique)
- `firstName` (optional)
- `lastName` (optional)
- `clerkId` (required, unique, indexed)
- `role` (enum: admin, staff, default: staff)
- `status` (enum: Active, Inactive, Delete, default: Active)
- `lastLoginAt` (timestamp, nullable)
- `invitationSentAt` (timestamp, nullable)
- `created_at` (timestamp, auto-generated)
- `updated_at` (timestamp, auto-updated)

#### User Activity Log (new table)

- `id` (primary key, UUID)
- `userId` (foreign key to Users.id)
- `action` (enum: login, role_change, status_change, profile_update)
- `details` (JSON, optional additional data)
- `performedBy` (foreign key to Users.id, who performed the action)
- `created_at` (timestamp, auto-generated)

### 6. Frontend Component Enhancements

#### Enhanced Admin Components

- `AdminUserTable` - Comprehensive user management table
- `UserRoleSelector` - Role assignment/change component
- `UserStatusSelector` - Status management component
- `UserDetailsModal` - Detailed user information popup
- `BulkUserActions` - Multi-select user operations
- `AdminDashboardStats` - User analytics and metrics

#### Enhanced Staff Components

- `StaffProfile` - Staff member profile view/edit
- `StaffDirectory` - Team directory view
- `StaffDashboardCards` - Staff-specific dashboard widgets

#### Shared Components

- `UserAvatar` - User profile image from Clerk
- `RoleBadge` - Role display component
- `StatusBadge` - Status display component
- `LastLoginIndicator` - Login status display

### 7. Navigation and Routing

#### Admin Navigation

- Dashboard (main page)
- User Management (/admin/users)
- Staff Listing (/staff) - existing page
- System Settings (/admin/settings)
- Profile (/profile)

#### Staff Navigation

- Dashboard (main page)
- Team Directory (/team) - filtered view of staff listing
- Profile (/profile)

#### Protected Routes

- All admin routes require admin role
- Staff routes require authentication
- Profile routes require authentication (own profile only)

## Technical Considerations

### Dependencies

- Existing Clerk integration (@clerk/nextjs)
- Existing Prisma/PostgreSQL setup
- Existing Apso-generated backend
- Existing shadcn/ui components
- React Query/SWR for data fetching

### Environment Variables

```env
# Existing Clerk variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Enhanced features
ENABLE_USER_ACTIVITY_LOG=true
DEFAULT_USER_ROLE=staff
```

### Performance Considerations

- Implement pagination for user lists
- Use React Query for caching user data
- Debounce search inputs
- Optimize Clerk webhook processing
- Implement proper loading states

### Security Requirements

- Validate all admin-only endpoints
- Implement rate limiting for user management actions
- Log all administrative actions
- Validate user permissions on frontend and backend
- Secure webhook endpoints with proper verification

## Success Metrics

1. **Functionality**: All user management workflows work end-to-end
2. **Performance**: User management pages load in under 2 seconds
3. **Security**: All admin actions are properly authorized and logged
4. **User Experience**: Role-appropriate dashboards provide clear navigation
5. **Data Integrity**: Clerk and backend data remain synchronized
6. **Accessibility**: All components meet WCAG guidelines

## Implementation Phases

### Phase 1: Backend API Enhancements

- Enhanced user management API endpoints
- User activity logging system
- Improved Clerk webhook handling
- Database schema updates

### Phase 2: Admin User Management

- Admin user management interface
- Role and status management components
- User details and activity views
- Bulk user operations

### Phase 3: Enhanced Dashboards

- Role-based dashboard rendering
- Admin analytics and metrics
- Staff profile management
- Navigation enhancements

### Phase 4: Integration and Polish

- Staff listing integration
- User activity logging UI
- Performance optimization
- Comprehensive testing

## Open Questions

1. **User Activity Retention**: How long should we keep user activity logs?
2. **Bulk Operations**: What bulk user operations should admins be able to perform?
3. **Staff Permissions**: Should staff users be able to view other staff profiles?
4. **Notification System**: Should admins receive notifications for user activities?
5. **Data Export**: Should admins be able to export user data for reporting?

## Implementation Notes

- Build upon existing Clerk integration without disrupting current functionality
- Maintain consistency with existing component library and styling
- Ensure proper error handling and user feedback
- Implement comprehensive logging for debugging and audit purposes
- Design for future scalability and additional role types
- Follow existing code patterns and architectural decisions
- Ensure mobile responsiveness for all new features

## Current System Status

✅ **Already Implemented:**

- Clerk authentication and user sync
- Basic role-based access control (admin/staff)
- Staff invitation via Clerk API
- User webhook processing
- Basic dashboard with role-based rendering
- Staff listing page (separate from dashboard)

🚧 **Needs Enhancement:**

- Comprehensive user management interface
- Enhanced role-based dashboards
- User activity logging and audit trail
- Integration between staff listing and dashboard
- Advanced user search and filtering
- Bulk user operations

❌ **Not Yet Implemented:**

- Admin user management interface
- User role/status management UI
- User activity logging system
- Enhanced admin analytics
- Staff profile management interface
- Integrated navigation system
