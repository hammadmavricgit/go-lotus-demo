# Select Component

A dropdown select component for choosing from a list of options with customizable styling and behavior.

## Overview

The Select component provides a user-friendly way to select from predefined options. It's commonly used in forms for choosing staff roles, status values, and other categorical data throughout the application.

## Props

### Select

| Prop           | Type                      | Default | Description                                 |
| -------------- | ------------------------- | ------- | ------------------------------------------- |
| `children`     | `ReactNode`               | -       | SelectOption components                     |
| `placeholder`  | `string`                  | -       | Placeholder text when no option is selected |
| `defaultValue` | `string`                  | -       | Default selected value                      |
| `disabled`     | `boolean`                 | `false` | Whether the select is disabled              |
| `className`    | `string`                  | -       | Additional CSS classes                      |
| `onChange`     | `(value: string) => void` | -       | Callback when selection changes             |

### SelectOption Interface

| Property | Type     | Description                    |
| -------- | -------- | ------------------------------ |
| `value`  | `string` | Option value                   |
| `label`  | `string` | Option display text            |

## Usage Examples

### Basic Select

```tsx
import { Select } from '@/components/ui/Select/Select';

const options = [
  { value: 'admin', label: 'Administrator' },
  { value: 'physiotherapist', label: 'Physiotherapist' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'nurse', label: 'Nurse' },
];

<Select placeholder='Select a role...' options={options} />
```

### Select with Label

```tsx
<div className='w-64 space-y-2'>
  <label className='text-sm font-medium text-gray-700'>Staff Role</label>
  <Select placeholder='Choose a role...' options={options} />
</div>
```

### Status Select

```tsx
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived' },
];

<div className='w-64 space-y-2'>
  <label className='text-sm font-medium text-gray-700'>Staff Status</label>
  <Select placeholder='Select status...' options={statusOptions} />
</div>
```

### Disabled Select

```tsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<div className='w-64 space-y-2'>
  <label className='text-sm font-medium text-gray-700'>Disabled Select</label>
  <Select placeholder='This select is disabled' disabled options={options} />
</div>
```

### Select with Default Value

```tsx
<div className='w-64 space-y-2'>
  <label className='text-sm font-medium text-gray-700'>Default Selection</label>
  <Select placeholder='Select a role...' defaultValue='physiotherapist' options={options} />
</div>
```

### Invitation Role Select

```tsx
const invitationOptions = [
  { value: 'physiotherapist', label: 'Physiotherapist' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'therapist', label: 'Therapist' },
];

<div className='w-64 space-y-2'>
  <label className='text-sm font-medium text-gray-700'>Invite as Role</label>
  <Select placeholder='Select role for invitation...' options={invitationOptions} />
</div>
```

### Multiple Selects

```tsx
<div className='space-y-4'>
  <div className='w-64 space-y-2'>
    <label className='text-sm font-medium text-gray-700'>Staff Role</label>
    <Select placeholder='Select an option...' options={options} />
  </div>
  <div className='w-64 space-y-2'>
    <label className='text-sm font-medium text-gray-700'>Status</label>
    <Select placeholder='Select an option...' options={statusOptions} />
  </div>
</div>
```

### Responsive Select

```tsx
const responsiveOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
  <label className='text-sm font-medium text-gray-700'>Responsive Select</label>
  <Select placeholder='Select an option...' options={responsiveOptions} />
  <p className='text-xs text-gray-500 mt-2'>
    This select adapts its width based on screen size.
  </p>
</div>
```

## Design Tokens

### Spacing

- Container padding: `p-2` (8px)
- Option padding: `px-3 py-2` (12px horizontal, 8px vertical)
- Gap between elements: `space-y-2` (8px)

### Typography

- Font size: `text-sm` (14px)
- Font weight: `font-medium` for labels
- Line height: `leading-none`

### Colors

- Background: `bg-white`
- Border: `border` (default border color)
- Text: `text-gray-900`
- Placeholder: `text-gray-500`
- Disabled: `text-gray-400`
- Focus: `ring-2 ring-blue-500`

### Border Radius

- `rounded-md` (6px)

### Shadow

- Dropdown shadow: `shadow-lg`
- Focus shadow: `ring-2 ring-blue-500`

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support (Arrow keys, Enter, Escape)
- Focus management
- Screen reader compatibility
- High contrast support

## Responsive Behavior

Selects adapt to different screen sizes:

```tsx
// Responsive width
<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
  <Select>...</Select>
</div>

// Responsive font size
<Select className="text-sm sm:text-base">...</Select>
```

## Best Practices

1. **Use clear labels**: Always provide descriptive labels for selects
2. **Provide meaningful placeholders**: Help users understand what to select
3. **Group related options**: Use logical grouping for better UX
4. **Handle disabled states**: Clearly indicate when selects are disabled
5. **Test keyboard navigation**: Ensure all options are accessible via keyboard
6. **Consider mobile experience**: Ensure dropdowns work well on touch devices
7. **Use consistent styling**: Maintain visual consistency across all selects

## Common Use Cases

### Staff Management

- **Role selection**: Choose staff roles (Admin, Physiotherapist, etc.)
- **Status selection**: Set staff status (Active, Inactive, Pending)
- **Department selection**: Assign staff to departments

### Form Inputs

- **Category selection**: Choose from predefined categories
- **Priority selection**: Set priority levels
- **Type selection**: Choose from different types

### Configuration

- **Settings selection**: Choose from configuration options
- **Filter selection**: Apply filters to data
- **Sort selection**: Choose sorting options

## Related Components

- **Input**: Often used together in forms
- **Button**: Used for form submission after selection
- **Card**: Selects are often used within cards
- **GenericTable**: Selects can be used for filtering table data
