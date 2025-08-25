# Dialog Component

## Purpose

The Dialog component is a modal dialog built on top of Radix UI's Dialog primitive. It provides a fully accessible modal overlay that can be used for forms, confirmations, or any content that needs to be displayed above the main page content.

## Props

### Dialog (Root)

- Extends `DialogPrimitive.Root` props
- Controls the open/closed state of the dialog

### DialogTrigger

- Extends `DialogPrimitive.Trigger` props
- The element that triggers the dialog to open

### DialogContent

- Extends `DialogPrimitive.Content` props
- The main content container of the dialog
- Includes built-in close button (X) in the top-right corner

### DialogHeader

- Extends `HTMLDivElement` props
- Container for dialog title and description
- Responsive text alignment (centered on mobile, left-aligned on desktop)

### DialogFooter

- Extends `HTMLDivElement` props
- Container for dialog actions/buttons
- Responsive layout (stacked on mobile, horizontal on desktop)

### DialogTitle

- Extends `DialogPrimitive.Title` props
- The main heading of the dialog
- Accessible to screen readers

### DialogDescription

- Extends `DialogPrimitive.Description` props
- Descriptive text below the title
- Accessible to screen readers

### DialogOverlay

- Extends `DialogPrimitive.Overlay` props
- The backdrop overlay behind the dialog
- Includes backdrop blur and fade animations

### DialogClose

- Extends `DialogPrimitive.Close` props
- Programmatic close trigger
- Can be used for custom close buttons

### DialogPortal

- Extends `DialogPrimitive.Portal` props
- Renders the dialog outside the normal DOM hierarchy

## Usage Examples

### Basic Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dilaog/dialog';

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <div className='flex justify-end space-x-2'>
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </DialogContent>
</Dialog>;
```

### Form Dialog

```tsx
<Dialog>
  <DialogTrigger>Add New Item</DialogTrigger>
  <DialogContent className='max-w-md'>
    <DialogHeader>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogDescription>
        Fill in the details below to create a new item.
      </DialogDescription>
    </DialogHeader>
    <form className='space-y-4'>
      <input placeholder='Item name' />
      <textarea placeholder='Description' />
      <div className='flex justify-end space-x-2'>
        <button type='button'>Cancel</button>
        <button type='submit'>Create</button>
      </div>
    </form>
  </DialogContent>
</Dialog>
```

### Custom Close Button

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Custom Close</DialogTitle>
    </DialogHeader>
    <p>Content here</p>
    <DialogClose asChild>
      <button className='btn'>Custom Close</button>
    </DialogClose>
  </DialogContent>
</Dialog>
```

## Accessibility Features

- **Focus Management**: Automatically manages focus when dialog opens/closes
- **Keyboard Navigation**: Supports Escape key to close
- **Screen Reader Support**: Proper ARIA attributes and roles
- **Focus Trap**: Keeps focus within the dialog when open
- **Backdrop Click**: Clicking outside closes the dialog
- **Close Button**: Accessible close button with screen reader text

## Styling

The component uses Tailwind CSS classes and includes:

- Responsive design with mobile-first approach
- Smooth animations for open/close states
- Backdrop blur effect
- Proper z-index layering
- Responsive padding and spacing
- Border and shadow styling

## Best Practices

1. **Always provide a title** - Helps users understand the dialog's purpose
2. **Use appropriate sizing** - Consider content length when setting max-width
3. **Provide clear actions** - Make sure buttons have clear, actionable text
4. **Handle form submission** - Properly manage form state and validation
5. **Test keyboard navigation** - Ensure all interactive elements are keyboard accessible
6. **Consider mobile experience** - Test on various screen sizes

## Dependencies

- `@radix-ui/react-dialog` - Core dialog functionality
- `lucide-react` - Close icon
- `@/lib/utils` - Utility functions for class merging
