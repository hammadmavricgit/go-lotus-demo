# ErrorMessage Component

A component for displaying error messages with consistent styling and accessibility features.

## Overview

The ErrorMessage component provides a standardized way to display error messages throughout the application. It's used in forms, data loading states, and validation scenarios to communicate errors clearly to users.

## Props

| Prop        | Type     | Default | Description              |
| ----------- | -------- | ------- | ------------------------ |
| `message`   | `string` | -       | Error message to display |
| `className` | `string` | -       | Additional CSS classes   |

## Usage Examples

### Basic Error Message

```tsx
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage';

<ErrorMessage message='An error occurred while loading the data.' />;
```

### Short Error Message

```tsx
<ErrorMessage message='Failed to load.' />
```

### Long Error Message

```tsx
<ErrorMessage message='This is a very long error message that demonstrates how the component handles text wrapping and overflow. It should be properly contained within the component boundaries.' />
```

### Staff Details Error

```tsx
<ErrorMessage message='Failed to load staff details. Please try refreshing the page.' />
```

### Network Error

```tsx
<ErrorMessage message='Network error: Unable to connect to the server. Please check your internet connection and try again.' />
```

### Validation Error

```tsx
<ErrorMessage message='Please fill in all required fields before submitting the form.' />
```

### Permission Error

```tsx
<ErrorMessage message='You do not have permission to access this resource. Please contact your administrator.' />
```

### Error in Card Container

```tsx
<div className='w-80 p-6 border rounded-lg shadow-sm'>
  <ErrorMessage message='Error loading clinic information.' />
</div>
```

### Error with Retry Button

```tsx
<div className='space-y-4'>
  <ErrorMessage message='Failed to load staff data. Please try again.' />
  <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
    Try Again
  </button>
</div>
```

### Multiple Error Messages

```tsx
<div className='space-y-4'>
  <ErrorMessage message='Failed to load staff profile.' />
  <ErrorMessage message='Unable to fetch working hours.' />
  <ErrorMessage message='Error loading emergency contacts.' />
</div>
```

### Responsive Error Message

```tsx
<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
  <ErrorMessage message='This error message will adapt its width based on the screen size and container constraints.' />
  <p className='text-xs text-gray-500 mt-2'>
    Error message adapts to container width
  </p>
</div>
```

### Custom Styled Error Messages

```tsx
<div className='space-y-4'>
  <ErrorMessage
    message='Custom styled error message'
    className='border-red-200 bg-red-50 text-red-800'
  />
  <ErrorMessage
    message='Custom styled error message'
    className='border-orange-200 bg-orange-50 text-orange-800'
  />
  <ErrorMessage
    message='Custom styled error message'
    className='border-yellow-200 bg-yellow-50 text-yellow-800'
  />
</div>
```

### Error with Custom Icon

```tsx
<div className='flex items-center gap-2 p-4 border border-red-200 bg-red-50 rounded-lg'>
  <svg
    className='w-5 h-5 text-red-600 flex-shrink-0'
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
      clipRule='evenodd'
    />
  </svg>
  <span className='text-red-800'>Error with custom icon styling</span>
</div>
```

## Design Tokens

### Spacing

- Padding: `p-4` (16px)
- Border radius: `rounded-lg` (8px)
- Gap with other elements: `space-y-4` (16px)

### Typography

- Font size: `text-sm` (14px)
- Line height: `leading-normal`
- Text wrapping: `break-words`

### Colors

- Background: `bg-red-50` (light red background)
- Border: `border-red-200` (red border)
- Text: `text-red-800` (dark red text)

### Border

- Width: `border` (1px)
- Style: `solid`
- Radius: `rounded-lg` (8px)

## Accessibility

- Uses semantic HTML structure
- Proper color contrast for readability
- Screen reader accessible
- Focus indicators for interactive elements
- ARIA attributes for error states

## Responsive Behavior

Error messages adapt to different screen sizes:

```tsx
// Responsive width
<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
  <ErrorMessage message="Responsive error message" />
</div>

// Responsive text sizing
<ErrorMessage
  message="Error message"
  className="text-xs sm:text-sm lg:text-base"
/>
```

## Best Practices

1. **Be specific**: Provide clear, actionable error messages
2. **Use appropriate tone**: Be helpful, not blaming
3. **Include solutions**: Suggest how to resolve the error
4. **Keep it concise**: Avoid overly long error messages
5. **Use consistent styling**: Maintain visual consistency across errors
6. **Test accessibility**: Ensure errors are readable by screen readers
7. **Handle edge cases**: Consider very long error messages

## Common Use Cases

### Form Validation

- **Required field errors**: When required fields are missing
- **Format errors**: When input format is invalid
- **Validation errors**: When data doesn't meet requirements

### Data Loading

- **Network errors**: When API calls fail
- **Permission errors**: When user lacks access
- **Server errors**: When backend operations fail

### User Actions

- **Save errors**: When data saving fails
- **Delete errors**: When deletion operations fail
- **Update errors**: When data updates fail

## Related Components

- **Card**: Error messages are often displayed within cards
- **LoadingSpinner**: Used when loading fails
- **Button**: Often used with retry actions
- **Toast**: For temporary error notifications
