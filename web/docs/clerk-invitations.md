# Clerk Invitations Guide

This guide explains how to use Clerk's invitation system in your application.

## Overview

Clerk provides a comprehensive invitation system that allows you to:
- Create invitations for new users
- Track invitation status (pending, accepted, revoked)
- Resend invitations
- Revoke invitations
- Get detailed invitation information

## Available APIs

### Server-Side Functions

Located in `web/src/lib/clerk-config-server.ts`:

```typescript
// Get all invitations
const invitations = await getClerkInvitations({
  limit: 10,
  offset: 0,
  status: 'pending', // 'pending' | 'accepted' | 'revoked'
  emailAddress: 'user@example.com'
});

// Get specific invitation
const invitation = await getClerkInvitation('invitation_id');

// Create invitation
const newInvitation = await createClerkInvitation({
  emailAddress: 'user@example.com',
  publicMetadata: {
    firstName: 'John',
    lastName: 'Doe',
    role: 'staff'
  },
  redirectUrl: 'https://yourapp.com/dashboard',
  expiresInDays: 7
});

// Revoke invitation
await revokeClerkInvitation('invitation_id');

// Resend invitation
await resendClerkInvitation('invitation_id');
```

### Client-Side Hook

Use the `useClerkInvitations` hook in React components:

```typescript
import { useClerkInvitations } from '@/hooks/useClerkInvitations';

function MyComponent() {
  const {
    invitations,
    loading,
    error,
    pagination,
    fetchInvitations,
    createInvitation,
    revokeInvitation,
    resendInvitation,
    getInvitation
  } = useClerkInvitations({
    limit: 10,
    status: 'pending',
    autoFetch: true
  });

  // Use the functions as needed
}
```

## API Endpoints

### GET `/api/invitations/clerk`

Fetch invitations from Clerk with pagination and filtering:

```typescript
// Query parameters
const params = {
  page: 1,
  limit: 10,
  status: 'pending', // optional
  email: 'user@example.com' // optional
};

const response = await fetch('/api/invitations/clerk?' + new URLSearchParams(params));
const data = await response.json();
```

### POST `/api/invitations/clerk`

Create a new invitation:

```typescript
const response = await fetch('/api/invitations/clerk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe'
  })
});
```

## Invitation Data Structure

```typescript
interface ClerkInvitation {
  id: string;
  emailAddress: string;
  status: 'pending' | 'accepted' | 'revoked';
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  acceptedAt?: string;
  revokedAt?: string;
  publicMetadata?: Record<string, any>;
  redirectUrl?: string;
}
```

## Usage Examples

### 1. Basic Invitation Management

```typescript
import { ClerkInvitationManager } from '@/components/invitations/ClerkInvitationManager';

export default function InvitationsPage() {
  return (
    <div className="container mx-auto py-8">
      <ClerkInvitationManager />
    </div>
  );
}
```

### 2. Custom Invitation Creation

```typescript
import { useClerkInvitations } from '@/hooks/useClerkInvitations';

function CustomInviteForm() {
  const { createInvitation } = useClerkInvitations();

  const handleInvite = async (email: string, metadata: any) => {
    try {
      await createInvitation(email, {
        firstName: metadata.firstName,
        lastName: metadata.lastName,
        role: 'admin',
        department: 'Engineering'
      });
      toast.success('Invitation sent!');
    } catch (error) {
      toast.error('Failed to send invitation');
    }
  };

  return (
    // Your form JSX
  );
}
```

### 3. Server-Side Invitation Processing

```typescript
import { getClerkInvitations, createClerkInvitation } from '@/lib/clerk-config-server';

export async function GET() {
  try {
    // Get pending invitations
    const pendingInvitations = await getClerkInvitations({
      status: 'pending',
      limit: 50
    });

    // Process invitations
    for (const invitation of pendingInvitations.data) {
      // Your custom logic here
      console.log(`Processing invitation for ${invitation.emailAddress}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to process invitations' }, { status: 500 });
  }
}
```

## Integration with Your Database

Your current setup tracks Clerk invitations in your database for additional features. Here's how to sync them:

```typescript
// When creating a Clerk invitation, also store in your database
const clerkInvitation = await createClerkInvitation({
  emailAddress: 'user@example.com',
  publicMetadata: { firstName: 'John', lastName: 'Doe' }
});

// Store in your database for tracking
await invitationService.createInvitation({
  clerkInvitationId: clerkInvitation.id,
  email: clerkInvitation.emailAddress,
  firstName: 'John',
  lastName: 'Doe',
  status: 'pending_approval'
});
```

## Best Practices

1. **Error Handling**: Always wrap Clerk API calls in try-catch blocks
2. **Loading States**: Show loading indicators during API calls
3. **Validation**: Validate email addresses before creating invitations
4. **Rate Limiting**: Be mindful of Clerk's API rate limits
5. **Metadata**: Use `publicMetadata` to store additional user information
6. **Expiration**: Set appropriate expiration times for invitations

## Environment Variables

Ensure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Troubleshooting

### Common Issues

1. **"Clerk client not available"**: Ensure you're using the hook within a Clerk provider
2. **"Failed to fetch invitations"**: Check your Clerk API keys and permissions
3. **"Invitation not found"**: Verify the invitation ID exists and hasn't expired

### Debug Mode

Enable Clerk debug mode to see detailed logs:

```typescript
// In your Clerk configuration
<ClerkProvider publishableKey={publishableKey} debug={true}>
  {children}
</ClerkProvider>
```

## Migration from Custom Invitations

If you're migrating from a custom invitation system:

1. Create Clerk invitations for existing pending invitations
2. Update your database to reference Clerk invitation IDs
3. Use the new Clerk-based components and hooks
4. Remove old invitation creation logic

## Security Considerations

- Clerk handles invitation security automatically
- Invitations expire automatically
- Revoked invitations cannot be accepted
- Email addresses are validated by Clerk
- Rate limiting prevents abuse

## Support

For Clerk-specific issues, refer to the [Clerk Documentation](https://clerk.com/docs). 