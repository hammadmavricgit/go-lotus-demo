# Badge Component

A small visual indicator component used to display status, labels, or categories with different visual styles.

## Overview

The Badge component is used throughout the application to display status indicators, role labels, and other categorical information. It provides consistent styling with multiple variants to convey different meanings.

## Props

| Prop        | Type                                                     | Default     | Description                     |
| ----------- | -------------------------------------------------------- | ----------- | ------------------------------- |
| `children`  | `ReactNode`                                              | -           | Content to display in the badge |
| `variant`   | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Visual style variant            |
| `className` | `string`                                                 | -           | Additional CSS classes          |

## Variants

### Default

Primary badge style with solid background and white text.

### Secondary

Secondary badge style with muted background and dark text.

### Destructive

Error/warning badge style with red background and white text.

### Outline

Subtle badge style with border and transparent background.

## Usage Examples

### Basic Badge

```tsx
import { Badge } from '@/components/ui/Badge/Badge';

<Badge>Default Badge</Badge>;
```

### Status Badges

```tsx
<div className='flex flex-wrap gap-2'>
  <Badge variant='default'>Active</Badge>
  <Badge variant='secondary'>Pending</Badge>
  <Badge variant='destructive'>Inactive</Badge>
  <Badge variant='outline'>Archived</Badge>
</div>
```

### Staff Status Indicators

```tsx
<div className='space-y-4'>
  <div className='flex items-center gap-2'>
    <span className='text-sm'>Current Staff:</span>
    <Badge variant='default'>Active</Badge>
  </div>
  <div className='flex items-center gap-2'>
    <span className='text-sm'>Former Staff:</span>
    <Badge variant='outline'>Archived</Badge>
  </div>
  <div className='flex items-center gap-2'>
    <span className='text-sm'>Suspended:</span>
    <Badge variant='destructive'>Inactive</Badge>
  </div>
</div>
```

### Role Badges

```tsx
<div className='flex flex-wrap gap-2'>
  <Badge variant='default'>Admin</Badge>
  <Badge variant='secondary'>Physiotherapist</Badge>
  <Badge variant='outline'>Receptionist</Badge>
  <Badge variant='secondary'>Nurse</Badge>
</div>
```

### Interactive Badges

```tsx
<div className='space-y-4'>
  <div className='flex flex-wrap gap-2'>
    <Badge
      variant='default'
      className='cursor-pointer hover:bg-blue-600 transition-colors'
    >
      Clickable Badge
    </Badge>
    <Badge
      variant='secondary'
      className='cursor-pointer hover:bg-gray-600 transition-colors'
    >
      Hover Effect
    </Badge>
  </div>
  <p className='text-sm text-gray-600'>
    Badges can be made interactive with hover effects and click handlers.
  </p>
</div>
```

### Responsive Badges

```tsx
<div className='space-y-4'>
  <div className='flex flex-wrap gap-2'>
    <Badge className='text-xs sm:text-sm'>Small on Mobile</Badge>
    <Badge variant='secondary' className='text-xs sm:text-sm'>
      Responsive Text
    </Badge>
  </div>
  <p className='text-sm text-gray-600'>
    Badge text size adapts to screen size for better mobile experience.
  </p>
</div>
```

## Design Tokens

### Spacing

- Padding: `px-2 py-1` (8px horizontal, 4px vertical)
- Gap between badges: `gap-2` (8px)

### Typography

- Font size: `text-xs` (12px)
- Font weight: `font-medium`
- Line height: `leading-none`

### Colors by Variant

#### Default

- Background: `bg-primary` (#FC5858)
- Text: `text-primary-foreground` (white)

#### Secondary

- Background: `bg-secondary` (#F4EDE2)
- Text: `text-secondary-foreground` (#11151B)

#### Destructive

- Background: `bg-destructive` (red)
- Text: `text-destructive-foreground` (white)

#### Outline

- Background: `bg-background` (transparent)
- Border: `border` (default border color)
- Text: `text-foreground` (default text color)

### Border Radius

- `rounded-md` (6px)

## Accessibility

- Badges use semantic HTML with proper color contrast
- Text is readable across all variants
- Interactive badges have hover states and focus indicators
- Screen readers can access badge content

## Responsive Behavior

Badges adapt to different screen sizes:

```tsx
// Responsive text sizing
<Badge className="text-xs sm:text-sm lg:text-base">
  Responsive Badge
</Badge>

// Responsive spacing
<div className="flex flex-wrap gap-1 sm:gap-2">
  <Badge>Badge 1</Badge>
  <Badge>Badge 2</Badge>
</div>
```

## Best Practices

1. **Use appropriate variants**: Choose variants that match the semantic meaning
2. **Keep text concise**: Badges work best with short, clear labels
3. **Consider color contrast**: Ensure text is readable on all backgrounds
4. **Use consistent spacing**: Maintain consistent gaps between multiple badges
5. **Make interactive badges obvious**: Add hover effects and cursor changes
6. **Test on mobile**: Ensure badges remain readable on small screens

## Common Use Cases

### Staff Management

- **Active/Inactive status**: `default` for active, `destructive` for inactive
- **Role indicators**: `secondary` for roles, `default` for admin
- **Archived status**: `outline` for archived staff

### System Status

- **Success states**: `default` variant
- **Warning states**: `secondary` variant
- **Error states**: `destructive` variant
- **Info states**: `outline` variant

### Categories and Tags

- **Primary categories**: `default` variant
- **Secondary categories**: `secondary` variant
- **Optional tags**: `outline` variant

## Related Components

- **Card**: Badges are often used within cards to show status
- **Button**: Badges can be used as part of button content
- **GenericTable**: Badges are used in table cells for status columns
- **Select**: Badges can show selected options
