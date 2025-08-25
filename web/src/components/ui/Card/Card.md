# Card Component

A flexible container component for displaying content in a structured layout with optional header and content sections.

## Overview

The Card component provides a consistent way to group related content together. It's commonly used throughout the application for displaying staff information, clinic details, working hours, and other structured data.

## Props

### Card

| Prop        | Type        | Default | Description                       |
| ----------- | ----------- | ------- | --------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the card |
| `className` | `string`    | -       | Additional CSS classes            |

### CardHeader

| Prop        | Type        | Default | Description                          |
| ----------- | ----------- | ------- | ------------------------------------ |
| `children`  | `ReactNode` | -       | Header content (typically CardTitle) |
| `className` | `string`    | -       | Additional CSS classes               |

### CardTitle

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Title text             |
| `className` | `string`    | -       | Additional CSS classes |

### CardContent

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Main content           |
| `className` | `string`    | -       | Additional CSS classes |

## Usage Examples

### Basic Card

```tsx
import { Card, CardContent } from '@/components/ui/Card/Card';

<Card>
  <CardContent>
    <p>This is a basic card with content.</p>
  </CardContent>
</Card>;
```

### Card with Header

```tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card has a header with a title.</p>
  </CardContent>
</Card>;
```

### Staff Profile Card

```tsx
<Card className='w-full max-w-md'>
  <CardHeader>
    <CardTitle>Staff Profile</CardTitle>
  </CardHeader>
  <CardContent>
    <div className='space-y-4'>
      <div className='flex items-center space-x-4'>
        <div className='w-12 h-12 bg-gray-200 rounded-full'></div>
        <div>
          <h3 className='font-semibold'>John Doe</h3>
          <p className='text-sm text-gray-600'>Physiotherapist</p>
        </div>
      </div>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span className='text-sm text-gray-600'>Email:</span>
          <span className='text-sm'>john.doe@example.com</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-sm text-gray-600'>Phone:</span>
          <span className='text-sm'>+1 (555) 123-4567</span>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
```

### Clinic Information Card

```tsx
<Card className='w-full max-w-md'>
  <CardHeader>
    <CardTitle>Clinic Information</CardTitle>
  </CardHeader>
  <CardContent>
    <div className='space-y-3'>
      <div>
        <label className='text-sm font-medium text-gray-700'>Clinic Name</label>
        <p className='text-sm'>Downtown Physiotherapy Clinic</p>
      </div>
      <div>
        <label className='text-sm font-medium text-gray-700'>Address</label>
        <p className='text-sm'>123 Main Street, Suite 100</p>
      </div>
      <div>
        <label className='text-sm font-medium text-gray-700'>Phone</label>
        <p className='text-sm'>+1 (555) 987-6543</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### Working Hours Card

```tsx
<Card className='w-full max-w-md'>
  <CardHeader>
    <CardTitle>Working Hours</CardTitle>
  </CardHeader>
  <CardContent>
    <div className='space-y-2'>
      <div className='flex justify-between'>
        <span className='text-sm'>Monday - Friday</span>
        <span className='text-sm font-medium'>9:00 AM - 6:00 PM</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-sm'>Saturday</span>
        <span className='text-sm font-medium'>10:00 AM - 4:00 PM</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-sm'>Sunday</span>
        <span className='text-sm font-medium'>Closed</span>
      </div>
    </div>
  </CardContent>
</Card>
```

## Design Tokens

### Spacing

- Card padding: `p-6` (24px)
- Header bottom margin: `mb-4` (16px)
- Content spacing: `space-y-4` (16px between elements)

### Colors

- Background: `bg-white`
- Border: `border` (default border color)
- Shadow: `shadow-sm` (subtle shadow)

### Typography

- Title: Default heading styles
- Content: Default text styles

## Accessibility

- Cards use semantic HTML structure
- Proper heading hierarchy with CardTitle
- Sufficient color contrast for text readability
- Focus indicators for interactive elements

## Responsive Behavior

Cards adapt to different screen sizes:

```tsx
// Responsive grid layout
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

## Best Practices

1. **Use consistent spacing**: Maintain consistent padding and margins across all cards
2. **Keep content focused**: Each card should contain related information
3. **Use appropriate titles**: CardTitle should clearly describe the content
4. **Consider mobile layout**: Ensure cards stack properly on smaller screens
5. **Maintain visual hierarchy**: Use CardHeader for titles and CardContent for details

## Related Components

- **Badge**: Often used within cards to display status indicators
- **Button**: Used for actions within cards
- **LoadingSpinner**: Used when card content is loading
- **ErrorMessage**: Used to display errors within cards
