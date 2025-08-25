# Staff Invite System - Implementation Guide

## Overview

This guide provides a roadmap for implementing the staff invite system based on the PRD. The system allows admin users to invite staff members via email, with a complete workflow from invitation to acceptance.

## Implementation Order

### Phase 1: Database Foundation
1. **Database Schema** - Create invitations table with Prisma
2. **Migration** - Run database migration
3. **Utilities** - Token generation and validation functions

### Phase 2: Backend APIs
4. **Admin Middleware** - Role-based access control
5. **Create Invitations** - POST /api/invitations
6. **List Invitations** - GET /api/invitations  
7. **Resend Invitations** - POST /api/invitations/[id]/resend
8. **Cancel Invitations** - DELETE /api/invitations/[id]
9. **Accept Invitations** - POST /api/invitations/accept

### Phase 3: Email Integration
10. **Email Service Setup** - SMTP configuration
11. **Email Templates** - HTML invitation emails

### Phase 4: Admin Dashboard
12. **Invite Button** - InviteStaffButton component
13. **Invitation Modal** - InvitationModal form component
14. **Status Badge** - InvitationStatusBadge component
15. **Invitation Table** - InvitationTable management component
16. **Dashboard Integration** - Add to admin dashboard

### Phase 5: Invitation Acceptance
17. **Token Validation** - Secure token handling
18. **Acceptance Page** - Public /invitations/accept/[token] page
19. **Role-based UI** - Hide invite features from staff

### Phase 6: Testing & Polish
20. **Error Handling** - Comprehensive error scenarios
21. **Environment Setup** - Email configuration variables
22. **API Testing** - All endpoints and edge cases
23. **UI Testing** - Complete user flows
24. **Mobile Responsiveness** - Cross-device compatibility
25. **Documentation** - Update project docs

## Key Features by Role

### Admin Users
- ✅ Can send staff invitations via email
- ✅ Can view all pending/accepted invitations
- ✅ Can resend or cancel pending invitations
- ✅ Dashboard shows invitation management interface

### Staff Users  
- ✅ Can accept invitations via secure email links
- ✅ Can set password during invitation acceptance
- ✅ Automatically logged in after acceptance
- ❌ Cannot see invitation management options

## Database Schema

```sql
-- Invitations table
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  invited_by UUID NOT NULL REFERENCES users(id),
  accepted_by UUID REFERENCES users(id),
  status invitation_status DEFAULT 'pending',
  expires_at TIMESTAMP NOT NULL,
  accepted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Status enum
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'expired', 'cancelled');
```

## API Endpoints

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| POST | `/api/invitations` | Admin | Create new invitation |
| GET | `/api/invitations` | Admin | List all invitations |
| POST | `/api/invitations/[id]/resend` | Admin | Resend invitation |
| DELETE | `/api/invitations/[id]` | Admin | Cancel invitation |
| POST | `/api/invitations/accept` | Public | Accept invitation |

## Environment Variables

```env
# Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
APP_URL=http://localhost:3000

# Invitation settings
INVITATION_EXPIRY_HOURS=168
```

## Security Considerations

- ✅ Cryptographically secure invitation tokens
- ✅ Token expiration (7 days default)
- ✅ Admin-only invitation creation
- ✅ HTTPS-only invitation links
- ✅ Input validation on all endpoints
- ✅ Rate limiting for invitation creation

## Testing Checklist

### API Testing
- [ ] Admin can create invitations
- [ ] Staff cannot create invitations
- [ ] Duplicate email validation
- [ ] Token expiration handling
- [ ] Invalid token rejection
- [ ] Successful invitation acceptance

### UI Testing
- [ ] Admin sees invite button
- [ ] Staff doesn't see invite button
- [ ] Invitation modal works correctly
- [ ] Table shows correct status
- [ ] Acceptance page validates tokens
- [ ] Mobile responsiveness

## Next Steps

1. Start with Phase 1 (Database Foundation)
2. Follow the implementation order
3. Test each phase before moving to the next
4. Update the TODO list as tasks are completed
5. Document any deviations from the original plan

## Dependencies

- Existing authentication system
- Prisma ORM setup
- Email service (SMTP)
- shadcn/ui components
- Existing dashboard structure