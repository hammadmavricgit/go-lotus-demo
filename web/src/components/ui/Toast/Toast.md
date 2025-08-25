# Toast Component

A notification component for displaying temporary messages to users with different types and actions.

## Overview

The Toast component provides a way to show temporary notifications to users. It's used throughout the application to display success messages, errors, warnings, and informational updates. Toasts appear briefly and can include actions for user interaction.

## Props

### Toast

| Prop        | Type        | Default | Description                                        |
| ----------- | ----------- | ------- | -------------------------------------------------- |
| `children`  | `ReactNode` | -       | Toast content (ToastTitle, ToastDescription, etc.) |
| `className` | `string`    | -       | Additional CSS classes                             |

### ToastTitle

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Title text             |
| `className` | `string`    | -       | Additional CSS classes |

### ToastDescription

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Description text       |
| `className` | `string`    | -       | Additional CSS classes |

### ToastAction

| Prop        | Type        | Default | Description                    |
| ----------- | ----------- | ------- | ------------------------------ |
| `altText`   | `string`    | -       | Accessible text for the action |
| `children`  | `ReactNode` | -       | Action button content          |
| `className` | `string`    | -       | Additional CSS classes         |

### ToastClose

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

## Usage Examples

### Basic Toast

```tsx
import {
  Toast,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/Toast/Toast';

<Toast>
  <ToastTitle>Notification</ToastTitle>
  <ToastDescription>This is a default toast notification.</ToastDescription>
</Toast>;
```

### Success Toast

```tsx
<Toast className='border-green-200 bg-green-50'>
  <ToastTitle className='text-green-800'>Success</ToastTitle>
  <ToastDescription className='text-green-700'>
    Staff member has been successfully added to the system.
  </ToastDescription>
  <ToastClose />
</Toast>
```

### Error Toast

```tsx
<Toast className='border-red-200 bg-red-50'>
  <ToastTitle className='text-red-800'>Error</ToastTitle>
  <ToastDescription className='text-red-700'>
    Failed to save staff information. Please try again.
  </ToastDescription>
  <ToastClose />
</Toast>
```

### Warning Toast

```tsx
<Toast className='border-yellow-200 bg-yellow-50'>
  <ToastTitle className='text-yellow-800'>Warning</ToastTitle>
  <ToastDescription className='text-yellow-700'>
    Some fields are missing. Please complete all required information.
  </ToastDescription>
  <ToastClose />
</Toast>
```

### Info Toast

```tsx
<Toast className='border-blue-200 bg-blue-50'>
  <ToastTitle className='text-blue-800'>Information</ToastTitle>
  <ToastDescription className='text-blue-700'>
    Your changes have been automatically saved.
  </ToastDescription>
  <ToastClose />
</Toast>
```

### Toast with Action

```tsx
<Toast>
  <ToastTitle>Staff Invitation</ToastTitle>
  <ToastDescription>
    Invitation sent successfully to john.doe@example.com
  </ToastDescription>
  <ToastAction altText='Resend invitation'>Resend</ToastAction>
  <ToastClose />
</Toast>
```

### Long Message Toast

```tsx
<Toast>
  <ToastTitle>System Update</ToastTitle>
  <ToastDescription>
    The system has been updated with new features including enhanced staff
    management, improved reporting capabilities, and better user interface. All
    your data has been preserved and the system is now running on the latest
    version.
  </ToastDescription>
  <ToastClose />
</Toast>
```

### Staff Created Toast

```tsx
<Toast className='border-green-200 bg-green-50'>
  <ToastTitle className='text-green-800'>Staff Created</ToastTitle>
  <ToastDescription className='text-green-700'>
    John Doe has been successfully added as a Physiotherapist.
  </ToastDescription>
  <ToastAction altText='View profile'>View Profile</ToastAction>
  <ToastClose />
</Toast>
```

### Profile Updated Toast

```tsx
<Toast className='border-blue-200 bg-blue-50'>
  <ToastTitle className='text-blue-800'>Profile Updated</ToastTitle>
  <ToastDescription className='text-blue-700'>
    Staff profile information has been successfully updated.
  </ToastDescription>
  <ToastClose />
</Toast>
```

### Invitation Sent Toast

```tsx
<Toast className='border-green-200 bg-green-50'>
  <ToastTitle className='text-green-800'>Invitation Sent</ToastTitle>
  <ToastDescription className='text-green-700'>
    Staff invitation has been sent to the provided email address.
  </ToastDescription>
  <ToastAction altText='Send another'>Send Another</ToastAction>
  <ToastClose />
</Toast>
```

### Validation Error Toast

```tsx
<Toast className='border-red-200 bg-red-50'>
  <ToastTitle className='text-red-800'>Validation Error</ToastTitle>
  <ToastDescription className='text-red-700'>
    Please fill in all required fields: Email, First Name, and Last Name.
  </ToastDescription>
  <ToastAction altText='Fix errors'>Fix Errors</ToastAction>
  <ToastClose />
</Toast>
```

### Multiple Toasts

```tsx
<div className='space-y-4'>
  <Toast className='border-green-200 bg-green-50'>
    <ToastTitle className='text-green-800'>Success</ToastTitle>
    <ToastDescription className='text-green-700'>
      Staff member added successfully.
    </ToastDescription>
    <ToastClose />
  </Toast>
  <Toast className='border-blue-200 bg-blue-50'>
    <ToastTitle className='text-blue-800'>Info</ToastTitle>
    <ToastDescription className='text-blue-700'>
      System maintenance scheduled for tonight.
    </ToastDescription>
    <ToastClose />
  </Toast>
  <Toast className='border-yellow-200 bg-yellow-50'>
    <ToastTitle className='text-yellow-800'>Warning</ToastTitle>
    <ToastDescription className='text-yellow-700'>
      Some data may be temporarily unavailable.
    </ToastDescription>
    <ToastClose />
  </Toast>
</div>
```

### Responsive Toast

```tsx
<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
  <Toast>
    <ToastTitle>Responsive Toast</ToastTitle>
    <ToastDescription>
      This toast adapts its width based on screen size and container
      constraints.
    </ToastDescription>
    <ToastClose />
  </Toast>
</div>
```

## Design Tokens

### Spacing

- Padding: `p-4` (16px)
- Gap between elements: `space-y-1` (4px)
- Border radius: `rounded-lg` (8px)

### Typography

- Title: `font-semibold` (600 weight)
- Description: `text-sm` (14px)
- Action: `text-sm` (14px)

### Colors by Type

#### Success

- Background: `bg-green-50`
- Border: `border-green-200`
- Title: `text-green-800`
- Description: `text-green-700`

#### Error

- Background: `bg-red-50`
- Border: `border-red-200`
- Title: `text-red-800`
- Description: `text-red-700`

#### Warning

- Background: `bg-yellow-50`
- Border: `border-yellow-200`
- Title: `text-yellow-800`
- Description: `text-yellow-700`

#### Info

- Background: `bg-blue-50`
- Border: `border-blue-200`
- Title: `text-blue-800`
- Description: `text-blue-700`

### Shadow

- `shadow-lg` (large shadow for elevation)

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

## Responsive Behavior

Toasts adapt to different screen sizes:

```tsx
// Responsive width
<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
  <Toast>...</Toast>
</div>

// Responsive text sizing
<Toast className="text-sm sm:text-base">...</Toast>
```

## Best Practices

1. **Use appropriate types**: Choose colors that match the message type
2. **Keep messages concise**: Avoid overly long toast messages
3. **Include actions when needed**: Provide actionable buttons for important messages
4. **Use consistent styling**: Maintain visual consistency across all toasts
5. **Test accessibility**: Ensure toasts are readable by screen readers
6. **Consider timing**: Toasts should auto-dismiss after appropriate time
7. **Handle multiple toasts**: Manage toast stacking and positioning

## Common Use Cases

### Success Notifications

- **Staff creation**: When staff member is successfully added
- **Profile updates**: When profile information is saved
- **Invitations sent**: When staff invitations are sent

### Error Notifications

- **Validation errors**: When form validation fails
- **Save errors**: When data saving fails
- **Network errors**: When API calls fail

### Information Notifications

- **Auto-save**: When changes are automatically saved
- **System updates**: When system maintenance is scheduled
- **Feature announcements**: When new features are available

## Related Components

- **Button**: Used for toast actions
- **ErrorMessage**: For persistent error display
- **LoadingSpinner**: Used during operations that trigger toasts
- **Card**: Toasts can be styled similar to cards
