# Product Requirements Document: Staff Invite System

## Introduction/Overview

This document outlines the requirements for building a staff invitation system for the existing Next.js 15 authentication application. The system will allow administrators to invite staff members via email, manage invitations, and enable staff members to accept invitations and automatically join the platform with appropriate role assignments. This builds upon the existing user authentication system and leverages the established role-based access patterns.

## Goals

1. **Admin Invitation Management**: Allow admin users to send email invitations to potential staff members with first name and last name
2. **Invitation Workflow**: Implement a complete invitation lifecycle from creation to acceptance
3. **Role-based Access Control**: Enforce proper permissions where only admins can invite staff
4. **Email Integration**: Send invitation emails with secure invitation links
5. **Seamless Onboarding**: Enable invited staff to accept invitations and automatically join with proper role assignment
6. **Dashboard Integration**: Integrate invitation management into the existing dashboard interface
7. **User Data Sync**: Automatically sync first name and last name from invitations to user profiles upon acceptance

## User Stories

1. **As an admin**, I want to invite staff members by email so that I can grow my team and grant access to the platform
2. **As an admin**, I want to approve or reject pending invitations so that I can control who gets access to the platform
3. **As an admin**, I want to see a list of all invitations with their approval status so that I can track the complete invitation lifecycle
4. **As an admin**, I want to resend approved invitations so that I can follow up with staff who haven't responded
5. **As an admin**, I want to cancel any invitation at any stage so that I can revoke access before it's granted
6. **As a staff member receiving an invitation**, I want to click a secure link to accept an approved invitation so that I can join the platform easily
7. **As a staff member**, I want to set my password during invitation acceptance so that I can secure my account
8. **As a staff member**, I want to be automatically logged in after accepting an invitation so that I can immediately access the dashboard
9. **As a staff member**, I should NOT see invitation management options in my dashboard so that the interface remains clean and role-appropriate
10. **As an admin**, I want invitation links to expire after a reasonable time so that security is maintained
11. **As a user**, I want clear feedback when invitation actions succeed or fail so that I understand the system status
12. **As an admin**, I want to receive notifications when invitations are pending my approval so that I can take timely action

## Functional Requirements

### 1. Invitation Creation (`/api/invitations`)

- The system must accept POST requests from authenticated admin users only
- The system must validate email format and prevent duplicate active invitations
- The system must require first name and last name fields for all invitations
- The system must generate unique, secure invitation tokens with expiration
- The system must store invitation data in the database with proper relationships
- The system must create invitations in `pending_approval` status initially
- The system must NOT send invitation emails until approval is granted
- The system must return appropriate success/error responses

### 2. Invitation Management API

#### List Invitations (`GET /api/invitations`)
- Return all invitations for admin users with pagination support
- Include invitation status, email, creation date, and expiration information
- Filter by status (pending, accepted, expired, cancelled)

#### Approve Invitation (`POST /api/invitations/[id]/approve`)
- Allow admin users to approve pending_approval invitations
- Change status from `pending_approval` to `approved`
- Send invitation email with secure acceptance link
- Record approval timestamp and approving admin

#### Reject Invitation (`POST /api/invitations/[id]/reject`)
- Allow admin users to reject pending_approval invitations
- Change status from `pending_approval` to `rejected`
- Record rejection timestamp and rejecting admin
- Prevent further processing of the invitation

#### Resend Invitation (`POST /api/invitations/[id]/resend`)
- Allow admin users to resend existing approved invitations
- Generate new invitation token with updated expiration
- Send new invitation email

#### Cancel Invitation (`DELETE /api/invitations/[id]`)
- Allow admin users to cancel invitations at any stage
- Mark invitation as cancelled in database
- Prevent further acceptance of the invitation

### 3. Invitation Acceptance

- Clerk handles the invitation acceptance flow automatically
- When users accept invitations through Clerk, they are automatically created as users
- Our system syncs user data from Clerk to our database
- The firstName and lastName from invitation metadata are copied to user profile
- Users are automatically assigned the staff role
- The system handles edge cases through Clerk's built-in validation

### 4. Database Schema Additions

#### Invitations Table
- `id` (primary key, auto-generated)
- `email` (required, email format)
- `firstName` (required, text, max 255 characters)
- `lastName` (required, text, max 255 characters)
- `token` (unique, required, secure random string)
- `invited_by` (foreign key to User.id, references admin who sent invitation)
- `approved_by` (foreign key to User.id, nullable, references admin who approved)
- `accepted_by` (foreign key to User.id, nullable, references user who accepted)
- `status` (enum: pending_approval, approved, rejected, accepted, expired, cancelled, default: pending_approval)
- `expires_at` (timestamp, required)
- `approved_at` (timestamp, nullable)
- `rejected_at` (timestamp, nullable)
- `accepted_at` (timestamp, nullable)
- `created_at` (timestamp, auto-generated)
- `updated_at` (timestamp, auto-updated)

#### User Table Updates
- No changes required - existing firstName and lastName fields support the invitation data
- Existing role field supports 'admin' and 'staff' roles

### 5. Frontend Components

#### Admin Dashboard Features
- Invite Staff button prominently displayed for admin users only
- Invitation management table showing all invitations with approval workflow
- Send invitation modal with email, first name, and last name input and validation
- Invitation status indicators (pending_approval, approved, rejected, accepted, expired, cancelled)
- Approve and reject action buttons for pending_approval invitations
- Resend and cancel action buttons for approved invitations
- Clear workflow indicators showing invitation progress

#### Staff Dashboard Features
- NO invitation management features visible
- Standard dashboard functionality only

#### Invitation Management
- Admin interface to view all tracked invitations
- Display first name and last name from invitation records
- Show invitation status and management actions
- Integration with Clerk's invitation system for actions
- Error handling for invalid/expired invitations

### 6. Email Integration

- Use Clerk's built-in invitation email system
- Clerk handles all email sending, templates, and delivery
- Our system tracks invitation records for management purposes
- Invitation links are generated by Clerk with proper security

### 7. Role-based Access Control

- Restrict invitation creation to admin users only
- Hide invitation management UI from staff users
- Validate admin permissions on all invitation API endpoints
- Ensure proper role assignment during invitation acceptance

### 8. Security Requirements

- Generate cryptographically secure invitation tokens
- Set reasonable invitation expiration (7 days default)
- Validate all inputs on both client and server
- Prevent invitation reuse and token manipulation
- Implement rate limiting for invitation creation
- Secure invitation URLs with HTTPS only

### 8. User Data Synchronization

- When invitations are accepted, firstName and lastName must be automatically copied to the user profile
- User profile updates should sync with Clerk user metadata
- Ensure data consistency between invitation data and user profile data
- Handle cases where user profile data might be updated independently

## Non-Goals (Out of Scope)

1. **Bulk Invitations**: Mass invitation functionality is not included
2. **Custom Role Assignment**: Invitations will only create staff users, not custom roles
3. **Invitation Templates**: Custom email templates are not included
4. **Integration with External Email Services**: Simple SMTP integration only
5. **Invitation Analytics**: Detailed tracking and analytics are not included
6. **Multi-step Invitation Process**: Complex approval workflows are not included
7. **Invitation Reminders**: Automatic reminder emails are not included
8. **User Profile Information**: Collecting additional user data during acceptance is not included

## Design Considerations

### UI/UX Requirements

#### Admin Dashboard Integration
- Add "Invite Staff" button to main dashboard navigation/header
- Create dedicated invitations management section
- Use consistent styling with existing dashboard components
- Implement responsive design for mobile and desktop

#### Invitation Management Interface
- Table view of all invitations with sortable columns
- Clear status indicators with color coding
- Action buttons for resend/cancel operations
- Modal dialogs for invitation creation
- Loading states and confirmation dialogs

#### Invitation Acceptance Flow
- Clean, branded acceptance page
- Password setup form with strength indicators
- Success state with automatic redirect
- Error handling with clear messaging

### Component Structure

- `InviteStaffButton` - Trigger for invitation creation
- `InvitationModal` - Modal form for sending invitations
- `InvitationTable` - Management table for admin dashboard
- `InvitationAcceptancePage` - Public page for accepting invitations
- `InvitationStatusBadge` - Reusable status indicator component

## Technical Considerations

### Dependencies Required

- Existing Next.js 15, Prisma, PostgreSQL setup
- Email service integration (nodemailer or similar)
- Additional validation libraries if needed
- UUID generation for secure tokens

### Environment Variables Required

- `SMTP_HOST`: Email server host
- `SMTP_PORT`: Email server port
- `SMTP_USER`: Email authentication user
- `SMTP_PASS`: Email authentication password
- `APP_URL`: Base application URL for invitation links
- `INVITATION_EXPIRY_HOURS`: Invitation expiration time (default: 168 hours / 7 days)

### Database Migration Requirements

- Create invitations table with proper indexes
- Add foreign key constraints
- Set up database triggers for automatic timestamp updates

### Email Configuration

- Configure SMTP settings for invitation delivery
- Create email templates with proper styling
- Handle email delivery failures gracefully
- Ensure email security and authentication

## Success Metrics

1. **Functionality**: All invitation workflows work end-to-end
2. **Security**: Invitation tokens are secure and properly validated
3. **User Experience**: Invitation process is intuitive for both admins and staff
4. **Performance**: Invitation creation and acceptance under 2 seconds
5. **Reliability**: Email delivery success rate above 95%
6. **Accessibility**: All components meet WCAG guidelines

## Error Handling & Edge Cases

### Invitation Creation
- Duplicate email addresses
- Invalid email formats
- Non-admin users attempting to invite
- Network failures during email sending

### Invitation Acceptance
- Expired invitation tokens
- Already accepted invitations
- Invalid or malformed tokens
- Password validation failures

### General
- Database connection failures
- Email service unavailability
- Concurrent invitation acceptance attempts

## Implementation Phases

### Phase 1: Backend Infrastructure
- Database schema and migrations
- API endpoints for invitation management
- Basic email sending functionality

### Phase 2: Admin Interface
- Dashboard integration
- Invitation creation and management UI
- Admin-only access controls

### Phase 3: Invitation Acceptance
- Public acceptance page
- Password setup and account creation
- Automatic authentication flow

### Phase 4: Polish & Testing
- Email template refinement
- Error handling improvements
- Performance optimization
- Comprehensive testing

## Open Questions

1. **Email Service**: Should we use a third-party email service (SendGrid, AWS SES) or SMTP?
2. **Invitation Limits**: Should there be limits on how many invitations an admin can send?
3. **Notification System**: Should admins receive notifications when invitations are accepted?
4. **Audit Trail**: Should we maintain detailed logs of all invitation activities?
5. **Invitation Customization**: Should admins be able to add custom messages to invitations?

## Implementation Notes

- Build upon existing authentication system without disrupting current functionality
- Ensure all new features are properly tested with existing user flows
- Maintain consistent coding standards and patterns from the base authentication system
- Design database schema to support future extensions (custom roles, bulk operations)
- Implement proper logging for debugging and monitoring invitation flows
- Consider performance implications of email sending and database queries
- Ensure mobile responsiveness for all new dashboard components