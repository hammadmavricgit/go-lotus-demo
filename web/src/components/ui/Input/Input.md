# Input Component

## Overview

A form input component that provides consistent styling and behavior for text inputs across the application. The input supports labels, error states, and follows the established design system with Manrope font.

## Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}
```

### Props Description

- **label** (optional): Text label displayed above the input field
- **required** (optional): Whether the field is required (shows red asterisk)
- **error** (optional): Whether to show error styling (red border)
- **containerClassName** (optional): Additional CSS classes for the container div
- **labelClassName** (optional): Additional CSS classes for the label
- **...props**: All standard HTML input attributes (type, placeholder, value, etc.)

## Usage Examples

### Basic Usage

```tsx
import { Input } from '@/components/ui/input';

<Input placeholder='Enter your name' />;
```

### With Label

```tsx
<Input label='Full Name' placeholder='Enter your full name' />
```

### Required Field

```tsx
<Input
  label='Email Address'
  required
  type='email'
  placeholder='Enter your email'
/>
```

### Error State

```tsx
<Input
  label='Password'
  type='password'
  error
  placeholder='Enter your password'
/>
```

### Different Input Types

```tsx
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="tel" placeholder="Phone number" />
```

### With Custom Styling

```tsx
<Input
  label='Custom Input'
  className='text-lg'
  containerClassName='w-full max-w-md'
/>
```

## Accessibility

- **ARIA Labels**: Proper label association with `htmlFor` attribute
- **Required Fields**: Visual indication with red asterisk
- **Error States**: Clear visual feedback for validation errors
- **Keyboard Navigation**: Fully keyboard accessible
- **Screen Readers**: Properly announced with labels and states
- **Focus Management**: Clear focus states with outline

## Design Tokens

- **Typography**:
  - Label: Manrope font, 16px, normal weight
  - Input: Manrope font, 14px, normal weight
- **Colors**:
  - Label text: `#000101` (near black)
  - Input text: `#565e64` (gray)
  - Border: `#565e64` with 0.5px width
  - Error border: `red-500`
  - Required asterisk: `#dc3545` (red)
- **Spacing**:
  - Container: `space-y-1` between label and input
  - Input padding: `px-2.5 py-3`
- **Dimensions**:
  - Input height: `h-[46px]`
  - Border radius: `rounded-lg`

## States

1. **Default**: Normal input appearance with gray border
2. **Focus**: Browser default focus outline
3. **Error**: Red border to indicate validation error
4. **Required**: Red asterisk next to label
5. **Disabled**: Inherits browser disabled styling

## Best Practices

- Always provide meaningful labels for screen readers
- Use appropriate input types (email, password, number, etc.)
- Show error states clearly with red borders
- Use required prop for mandatory fields
- Test keyboard navigation and screen reader compatibility
- Provide helpful placeholder text

## Related Components

- Form components for form handling
- Validation components for error display
- Label components for standalone labels
- Textarea components for multi-line input
