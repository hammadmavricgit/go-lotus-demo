# Task List: Enhanced Clerk-Based Staff Management System

## Overview

This task list implements the enhanced Clerk-based staff management system as outlined in the PRD. The system builds upon the existing Clerk authentication integration and adds comprehensive user management, role-based dashboards, and integrated staff management features with first name and last name support.

## Phase 1: Backend API Enhancements (Priority: High)

### 1.1 User Management API Endpoints

- [ ] **Create GET /api/users endpoint**

  - Add pagination, filtering, and search capabilities
  - Include role and status filtering
  - Admin-only access control
  - Return user data with Clerk sync status

- [ ] **Create PUT /api/users/[id]/role endpoint**

  - Allow admin users to update user roles (admin/staff)
  - Validate at least one admin remains in system
  - Log role changes for audit trail
  - Update both backend and Clerk metadata if needed

- [ ] **Create PUT /api/users/[id]/status endpoint**

  - Allow admin users to update user status (Active/Inactive/Delete)
  - Handle soft delete functionality
  - Prevent self-deletion by admin users
  - Sync status changes with Clerk

- [ ] **Enhance GET /api/users/[id] endpoint**

  - Return complete user information (Clerk + backend data)
  - Include role, status, invitation history, last login
  - Role-based access control (admin: all users, staff: own profile only)

- [ ] **Create POST /api/users/[id]/sync endpoint**
  - Force sync specific user data from Clerk to backend
  - Handle cases where Clerk user exists but backend user doesn't
  - Admin-only access

### 1.2 Enhanced Invitation Management API

- [ ] **Update POST /api/invitations endpoint**
  - Require firstName and lastName fields in invitation creation
  - Validate all required fields (email, firstName, lastName)
  - Generate secure invitation tokens
  - Store invitation data with proper relationships

- [ ] **Update GET /api/invitations endpoint**
  - Return invitations with firstName and lastName data
  - Include pagination and filtering
  - Admin-only access control

- [ ] **Create POST /api/invitations/track endpoint**
  - Track Clerk invitations in our database
  - Store firstName and lastName from invitation metadata
  - Sync invitation status with Clerk
  - Admin-only access control

- [ ] **Create invitation management endpoints**
  - POST /api/invitations/[id]/approve - Approve pending invitations
  - POST /api/invitations/[id]/reject - Reject pending invitations
  - POST /api/invitations/[id]/resend - Resend approved invitations
  - DELETE /api/invitations/[id] - Cancel invitations

### 1.3 User Activity Logging System

- [ ] **Create User Activity Log database table**

  - Design schema for activity tracking
  - Add Prisma model for UserActivityLog
  - Create database migration

- [ ] **Implement activity logging service**

  - Create service for logging user activities
  - Log login, role changes, status changes, profile updates
  - Include performer of action for audit trail

- [ ] **Create GET /api/users/[id]/activity endpoint**
  - Return user activity history
  - Pagination and filtering by action type
  - Admin-only access

### 1.4 Enhanced Clerk Webhook Processing

- [ ] **Enhance POST /api/webhooks/clerk endpoint**

  - Add session.created event handling for last login tracking
  - Add email.updated event handling
  - Add user.updated event handling for firstName/lastName sync
  - Improve error handling and logging
  - Ensure idempotent processing

- [ ] **Add lastLoginAt tracking**
  - Update Users table schema to include lastLoginAt
  - Create migration for new field
  - Update webhook handler to track login events

## Phase 2: Admin User Management Interface (Priority: High)

### 2.1 Admin User Management Components

- [ ] **Create AdminUserTable component**

  - Display all users with pagination
  - Include search and filtering capabilities
  - Show role, status, last login, invitation date
  - Add sorting functionality

- [ ] **Create UserRoleSelector component**

  - Dropdown for role assignment/change
  - Validate admin user count before role changes
  - Show confirmation dialog for role changes
  - Handle API calls for role updates

- [ ] **Create UserStatusSelector component**

  - Dropdown for status management (Active/Inactive/Delete)
  - Show confirmation dialog for status changes
  - Handle soft delete functionality
  - Prevent self-deletion

- [ ] **Create UserDetailsModal component**

  - Show complete user information popup
  - Display Clerk data and backend data
  - Include activity history
  - Allow inline editing of basic information

- [ ] **Create BulkUserActions component**
  - Multi-select functionality for user table
  - Bulk role updates
  - Bulk status updates
  - Bulk invitation resending

### 2.2 Enhanced Invitation Management Components

- [ ] **Create InviteStaffModal component**
  - Form with email, firstName, and lastName fields
  - Validation for all required fields
  - Integration with Apso-generated Invitation controller
  - Success/error handling

- [ ] **Create InvitationTable component**
  - Display all invitations with pagination
  - Show firstName, lastName, email, status, dates
  - Action buttons for approve/reject/resend/cancel
  - Status indicators and workflow progress

- [ ] **Create InvitationStatusBadge component**
  - Reusable status indicator
  - Color-coded status display
  - Tooltip with status description

- [ ] **Create InvitationTrackingService component**
  - Service to sync Clerk invitations with our database
  - Update invitation status based on Clerk events
  - Handle user creation from accepted invitations

### 2.3 Admin Dashboard Enhancement

- [ ] **Create AdminDashboardStats component**

  - Display user count metrics (total, admin, staff, active, inactive)
  - Show recent user activities
  - Display invitation metrics
  - Add quick action buttons

- [ ] **Enhance main dashboard page for admin users**
  - Add user management section
  - Include admin analytics
  - Add quick navigation to user management
  - Show system health indicators

### 2.4 Admin User Management Page

- [ ] **Create /admin/users page**

  - Full-featured user management interface
  - Integrate AdminUserTable with all components
  - Add user creation flow (Clerk invitation)
  - Include bulk operations interface

- [ ] **Create /admin/invitations page**
  - Full-featured invitation management interface
  - Integrate InvitationTable with all components
  - Add invitation creation flow
  - Include invitation workflow management

- [ ] **Add navigation to admin user management**
  - Update sidebar/navigation for admin users
  - Add breadcrumb navigation
  - Ensure role-based access control

## Phase 3: Enhanced Role-Based Dashboards (Priority: Medium)

### 3.1 Enhanced Admin Dashboard

- [ ] **Create AdminDashboardLayout component**

  - Specialized layout for admin users
  - Include admin-specific navigation
  - Add admin-only widgets and shortcuts

- [ ] **Add admin-specific features to main dashboard**
  - System overview widgets
  - Recent user activities feed
  - Quick user management actions
  - System alerts and notifications

### 3.2 Enhanced Staff Dashboard

- [ ] **Create StaffDashboardLayout component**

  - Specialized layout for staff users
  - Hide admin-specific features
  - Include staff-relevant navigation

- [ ] **Create StaffProfile component**

  - Allow staff to view/edit own profile
  - Sync changes with Clerk
  - Show read-only admin-managed fields

- [ ] **Create StaffDirectory component**
  - Show team directory for staff users
  - Filtered view of staff listing
  - Basic contact information display

### 3.3 Enhanced Navigation System

- [ ] **Update ProtectedRoute component**

  - Add role-based route protection
  - Redirect based on user role
  - Handle loading and error states

- [ ] **Create role-based navigation components**

  - AdminNavigation component
  - StaffNavigation component
  - Shared navigation elements

- [ ] **Update main layout to use role-based navigation**
  - Dynamically render navigation based on user role
  - Include role indicators in header
  - Add user menu with role-appropriate options

## Phase 4: Integration and Enhanced Features (Priority: Medium)

### 4.1 Staff Listing Integration

- [ ] **Integrate staff listing with dashboard navigation**

  - Add staff listing to admin navigation menu
  - Update staff listing page to match dashboard styling
  - Add role/status management actions to staff listing

- [ ] **Enhance staff listing with user management**
  - Add quick role change functionality
  - Add status management from staff listing
  - Show Clerk sync status for each staff member
  - Add user detail modal integration

### 4.2 User Profile Integration

- [ ] **Create unified user profile system**

  - Connect user profiles with Clerk user data
  - Show comprehensive user information
  - Enable profile updates that sync to both systems

- [ ] **Create /profile page**
  - User profile view/edit page
  - Role-appropriate editing permissions
  - Integration with Clerk profile updates

### 4.3 Enhanced User Search and Filtering

- [ ] **Implement advanced search functionality**

  - Search by name, email, role, status
  - Debounced search input
  - Search result highlighting

- [ ] **Add advanced filtering options**
  - Filter by role, status, registration date
  - Filter by last login date
  - Filter by invitation status

## Phase 5: Polish and Advanced Features (Priority: Low)

### 5.1 User Activity and Audit Trail

- [ ] **Create UserActivityFeed component**

  - Display recent user activities
  - Filter by activity type and date range
  - Show activity details and performer

- [ ] **Add audit trail to admin interface**
  - Show activity logs in user details
  - Add system-wide activity overview
  - Export functionality for audit reports

### 5.2 Advanced Admin Features

- [ ] **Add user data export functionality**

  - Export user lists to CSV/Excel
  - Include filtering and date range options
  - Export user activity reports

- [ ] **Create system settings interface**
  - Manage default user roles
  - Configure invitation settings
  - System health monitoring

### 5.3 Performance Optimization

- [ ] **Implement React Query for data fetching**

  - Cache user data and lists
  - Optimistic updates for user changes
  - Background data synchronization

- [ ] **Add loading states and error handling**
  - Skeleton loading for user tables
  - Error boundaries for admin interfaces
  - Retry mechanisms for failed API calls

### 5.4 Mobile Responsiveness

- [ ] **Ensure mobile compatibility for admin interfaces**

  - Responsive user management tables
  - Mobile-friendly navigation
  - Touch-optimized user interactions

- [ ] **Optimize dashboard for mobile devices**
  - Responsive dashboard layouts
  - Mobile-appropriate user profiles
  - Touch-friendly controls

## Testing and Quality Assurance

### 6.1 API Testing

- [ ] **Test all user management API endpoints**

  - Role-based access control validation
  - Input validation and error handling
  - Performance testing with large user sets

- [ ] **Test invitation management API endpoints**
  - firstName and lastName field validation
  - Invitation workflow testing
  - User creation from invitations

- [ ] **Test Clerk webhook integration**
  - Event processing accuracy
  - Idempotent webhook handling
  - Error recovery and logging

### 6.2 Frontend Testing

- [ ] **Test role-based UI rendering**

  - Admin vs staff dashboard differences
  - Navigation and access control
  - User management interface functionality

- [ ] **Test invitation flows end-to-end**
  - Invitation creation with firstName/lastName
  - Invitation acceptance and user creation
  - Role and status management workflows
  - Profile update synchronization

### 6.3 Security Testing

- [ ] **Validate admin-only endpoint security**

  - Test unauthorized access attempts
  - Validate role-based permissions
  - Test API authentication

- [ ] **Test data synchronization security**
  - Clerk webhook verification
  - User data integrity checks
  - Audit trail accuracy

## Dependencies and Prerequisites

### Backend Dependencies

- Updated Apso-generated Invitation controller with firstName/lastName fields
- PostgreSQL database with updated schema
- Clerk webhook infrastructure

### Frontend Dependencies

- Existing Clerk integration (@clerk/nextjs)
- shadcn/ui component library
- React Query/SWR for data fetching
- Existing authentication hooks

### Environment Setup

- Clerk environment variables configured
- Backend API endpoints accessible
- Database migrations applied
- Webhook endpoints configured

## Success Criteria

1. ✅ **Admin users can manage all system users effectively**
2. ✅ **Invitations include firstName and lastName fields**
3. ✅ **User data syncs properly between invitations and user profiles**
4. ✅ **Role-based dashboards provide appropriate functionality**
5. ✅ **Staff listing is integrated with user management**
6. ✅ **User data remains synchronized between Clerk and backend**
7. ✅ **All administrative actions are logged and auditable**
8. ✅ **System performance remains optimal with enhanced features**
9. ✅ **Mobile experience is fully functional**
10. ✅ **Security and access controls work correctly**

## Implementation Order

1. **Start with Phase 1** (Backend API Enhancements) - Essential foundation
2. **Move to Phase 2** (Admin User Management Interface) - Core functionality
3. **Implement Phase 3** (Enhanced Dashboards) - User experience
4. **Complete Phase 4** (Integration) - Polish and connections
5. **Finish with Phase 5** (Advanced Features) - Enhancement and optimization

Each phase should be completed and tested before moving to the next phase to ensure system stability and feature reliability.
