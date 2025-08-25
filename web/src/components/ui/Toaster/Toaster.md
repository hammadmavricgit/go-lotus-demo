# Toaster Component

## Purpose

The Toaster component is a toast notification system that displays temporary messages to users. It works in conjunction with the `useToast` hook to provide a centralized way to show success, error, warning, or informational messages. The component automatically manages the display and positioning of multiple toast notifications.

## Props

The Toaster component itself doesn't accept props directly. It reads from the toast context provided by the `useToast` hook.

## Usage Examples

### Basic Usage

```tsx
import { Toaster } from '@/components/ui/Toaster/Toaster';
import { useToast } from '@/hooks/use-toast';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Toaster />
    </div>
  );
}
```

### Using with useToast Hook

```tsx
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/Button/Button';

function MyComponent() {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: 'Success!',
      description: 'Your action was completed successfully.',
    });
  };

  const showErrorToast = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  };

  return (
    <div className='space-x-2'>
      <Button onClick={showSuccessToast}>Show Success</Button>
      <Button onClick={showErrorToast} variant='destructive'>
        Show Error
      </Button>
    </div>
  );
}
```

### Toast with Actions

```tsx
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/Button/Button';

function ToastWithAction() {
  const { toast } = useToast();

  const showToastWithAction = () => {
    toast({
      title: 'Undo Action',
      description: 'Your item was deleted.',
      action: (
        <Button variant='outline' size='sm'>
          Undo
        </Button>
      ),
    });
  };

  return <Button onClick={showToastWithAction}>Show Toast with Action</Button>;
}
```

### Different Toast Variants

```tsx
import { useToast } from '@/hooks/use-toast';

function ToastVariants() {
  const { toast } = useToast();

  const showDifferentToasts = () => {
    // Default toast
    toast({
      title: 'Default Toast',
      description: 'This is a default toast message.',
    });

    // Destructive toast
    toast({
      title: 'Error',
      description: 'This is an error message.',
      variant: 'destructive',
    });

    // Toast with custom duration
    toast({
      title: 'Custom Duration',
      description: 'This toast will stay longer.',
      duration: 10000, // 10 seconds
    });
  };

  return <Button onClick={showDifferentToasts}>Show Different Toasts</Button>;
}
```

## Toast Configuration Options

When using the `toast()` function from `useToast`, you can configure:

### Basic Properties

- `title`: The main heading of the toast
- `description`: Additional descriptive text
- `action`: Optional action button or element

### Advanced Properties

- `variant`: Toast style variant (`default`, `destructive`)
- `duration`: How long the toast stays visible (in milliseconds)
- `className`: Custom CSS classes for styling

## Component Structure

The Toaster component consists of:

1. **ToastProvider**: Wraps the toast context
2. **Toast**: Individual toast notification component
3. **ToastTitle**: Toast heading
4. **ToastDescription**: Toast description text
5. **ToastClose**: Close button for the toast
6. **ToastViewport**: Container that manages toast positioning

## Accessibility Features

- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Focus management for interactive elements
- **Auto-dismiss**: Toasts automatically disappear after a set duration
- **Manual Dismiss**: Users can manually close toasts
- **High Contrast**: Supports high contrast mode for better visibility

## Styling and Customization

The component uses Tailwind CSS classes and can be customized through:

- CSS custom properties for colors and spacing
- Tailwind utility classes for layout and typography
- Responsive design that works on all screen sizes
- Consistent spacing and typography with the design system

## Best Practices

1. **Keep messages concise** - Toast notifications should be brief and actionable
2. **Use appropriate variants** - Use `destructive` for errors, default for success/info
3. **Provide clear actions** - When including action buttons, make their purpose clear
4. **Don't overuse** - Avoid showing too many toasts simultaneously
5. **Consider duration** - Set appropriate auto-dismiss times based on message importance
6. **Test accessibility** - Ensure toasts are properly announced by screen readers

## Integration with Other Components

The Toaster works seamlessly with:

- **Button components** - For action buttons within toasts
- **Form components** - To show validation or submission feedback
- **API calls** - To display success/error messages
- **User interactions** - To confirm actions or provide feedback

## Dependencies

- `@/hooks/use-toast` - Hook for managing toast state
- `@/components/ui/Toast/Toast` - Individual toast components
- React context for state management
- Tailwind CSS for styling

## Performance Considerations

- Toasts are rendered only when needed
- Automatic cleanup of dismissed toasts
- Efficient re-rendering using React's state management
- Minimal DOM manipulation for smooth animations
