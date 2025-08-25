# LoadingSpinner Component

A customizable loading indicator component that displays an animated spinner to indicate loading states throughout the application.

## Overview

The LoadingSpinner component provides visual feedback when data is being loaded or operations are in progress. It's used extensively across the application in staff sections, forms, and data tables to improve user experience during asynchronous operations.

## Props

| Prop        | Type                   | Default | Description                 |
| ----------- | ---------------------- | ------- | --------------------------- |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`  | Size of the loading spinner |
| `className` | `string`               | -       | Additional CSS classes      |

## Sizes

### Small (`sm`)

Compact spinner for inline use or small containers.

### Medium (`md`)

Standard size for most loading scenarios.

### Large (`lg`)

Large spinner for full-page or prominent loading states.

## Usage Examples

### Basic Loading Spinner

```tsx
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';

<LoadingSpinner />;
```

### Different Sizes

```tsx
<div className='flex items-center gap-8'>
  <div className='text-center'>
    <LoadingSpinner size='sm' />
    <p className='text-sm text-gray-600 mt-2'>Small</p>
  </div>
  <div className='text-center'>
    <LoadingSpinner size='md' />
    <p className='text-sm text-gray-600 mt-2'>Medium</p>
  </div>
  <div className='text-center'>
    <LoadingSpinner size='lg' />
    <p className='text-sm text-gray-600 mt-2'>Large</p>
  </div>
</div>
```

### With Loading Text

```tsx
<div className='flex flex-col items-center gap-4'>
  <LoadingSpinner size='md' />
  <p className='text-sm text-gray-600'>Loading staff data...</p>
</div>
```

### In Card Container

```tsx
<div className='w-80 p-6 border rounded-lg shadow-sm'>
  <div className='flex flex-col items-center gap-4'>
    <LoadingSpinner size='md' />
    <p className='text-sm text-gray-600'>Loading clinic information...</p>
  </div>
</div>
```

### Staff Section Loading

```tsx
<div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
  <div className='flex items-center gap-3'>
    <LoadingSpinner size='sm' />
    <div>
      <h3 className='font-medium text-gray-900'>Staff Hours</h3>
      <p className='text-sm text-gray-600'>Loading working hours...</p>
    </div>
  </div>
</div>
```

### Emergency Contacts Loading

```tsx
<div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
  <div className='flex items-center gap-3'>
    <LoadingSpinner size='sm' />
    <div>
      <h3 className='font-medium text-gray-900'>Emergency Contacts</h3>
      <p className='text-sm text-gray-600'>Loading contact information...</p>
    </div>
  </div>
</div>
```

### Credentials Loading

```tsx
<div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
  <div className='flex items-center gap-3'>
    <LoadingSpinner size='sm' />
    <div>
      <h3 className='font-medium text-gray-900'>Staff Credentials</h3>
      <p className='text-sm text-gray-600'>Loading credentials...</p>
    </div>
  </div>
</div>
```

### Special Conditions Loading

```tsx
<div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
  <div className='flex items-center gap-3'>
    <LoadingSpinner size='sm' />
    <div>
      <h3 className='font-medium text-gray-900'>Special Conditions</h3>
      <p className='text-sm text-gray-600'>Loading special conditions...</p>
    </div>
  </div>
</div>
```

### Responsive Loading

```tsx
<div className='flex flex-col items-center gap-4'>
  <LoadingSpinner size='sm' className='sm:hidden' />
  <LoadingSpinner size='md' className='hidden sm:block md:hidden' />
  <LoadingSpinner size='lg' className='hidden md:block' />
  <p className='text-sm text-gray-600'>Spinner size adapts to screen size</p>
</div>
```

### Custom Colors

```tsx
<div className='flex items-center gap-8'>
  <div className='text-center'>
    <LoadingSpinner size='md' className='text-blue-600' />
    <p className='text-sm text-gray-600 mt-2'>Blue</p>
  </div>
  <div className='text-center'>
    <LoadingSpinner size='md' className='text-green-600' />
    <p className='text-sm text-gray-600 mt-2'>Green</p>
  </div>
  <div className='text-center'>
    <LoadingSpinner size='md' className='text-red-600' />
    <p className='text-sm text-gray-600 mt-2'>Red</p>
  </div>
</div>
```

## Design Tokens

### Sizes

#### Small (`sm`)

- Width: `w-4` (16px)
- Height: `h-4` (16px)

#### Medium (`md`)

- Width: `w-6` (24px)
- Height: `h-6` (24px)

#### Large (`lg`)

- Width: `w-8` (32px)
- Height: `h-8` (32px)

### Colors

- Default: `text-gray-600`
- Customizable via `className` prop

### Animation

- Duration: `animate-spin`
- Timing: `ease-linear`
- Infinite rotation

### Spacing

- Gap with text: `gap-4` (16px)
- Gap in flex layouts: `gap-3` (12px)

## Accessibility

- Uses `aria-hidden="true"` to hide from screen readers
- Provides text alternatives for loading states
- Maintains focus management during loading
- Supports high contrast modes

## Responsive Behavior

Loading spinners adapt to different screen sizes:

```tsx
// Responsive sizing
<LoadingSpinner size="sm" className="sm:hidden" />
<LoadingSpinner size="md" className="hidden sm:block md:hidden" />
<LoadingSpinner size="lg" className="hidden md:block" />

// Responsive spacing
<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
  <LoadingSpinner size="sm" />
  <p className="text-sm text-gray-600">Loading...</p>
</div>
```

## Best Practices

1. **Provide context**: Always include descriptive text with spinners
2. **Use appropriate sizes**: Choose size based on container and importance
3. **Consider placement**: Position spinners where users expect loading feedback
4. **Maintain consistency**: Use consistent spinner styling across the app
5. **Handle loading states**: Show spinners only when actually loading
6. **Test on mobile**: Ensure spinners work well on touch devices
7. **Use custom colors sparingly**: Stick to default colors unless branding requires it

## Common Use Cases

### Data Loading

- **Staff profile loading**: When fetching staff details
- **Table data loading**: When loading staff lists
- **Form submission**: During form processing

### Section Loading

- **Staff hours**: Loading working hours data
- **Emergency contacts**: Loading contact information
- **Credentials**: Loading staff credentials
- **Special conditions**: Loading condition data

### Page Loading

- **Initial page load**: When loading page content
- **Navigation**: During route transitions
- **Data refresh**: When refreshing data

## Related Components

- **Card**: Loading spinners are often used within cards
- **ErrorMessage**: Used when loading fails
- **Button**: Loading spinners can be used in buttons during submission
- **GenericTable**: Loading spinners used in table loading states
