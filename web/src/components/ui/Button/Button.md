# Button Component

## Overview

A reusable button component that provides consistent styling and behavior across the application. The button supports different variants and follows the established design system.

## Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}
```

### Props Description

- **variant** (optional): Visual style variant of the button
  - `"primary"` (default): Red background with white text
  - `"secondary"`: Transparent background with red border and text
- **children**: Content to display inside the button
- **className** (optional): Additional CSS classes to apply
- **...props**: All standard HTML button attributes (onClick, disabled, etc.)

## Usage Examples

### Basic Usage

```tsx
import { Button } from '@/components/ui/button';

<Button>Click me</Button>;
```

### Primary Variant (Default)

```tsx
<Button variant='primary'>Primary Button</Button>
```

### Secondary Variant

```tsx
<Button variant='secondary'>Secondary Button</Button>
```

### With Click Handler

```tsx
<Button onClick={() => console.log('Button clicked')}>Click Handler</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled Button</Button>
```

### With Custom Classes

```tsx
<Button className='w-full px-8 py-3'>Full Width Button</Button>
```

## Accessibility

- **ARIA Labels**: Inherits all standard button accessibility features
- **Keyboard Navigation**: Fully keyboard accessible
- **Focus Management**: Clear focus ring with brand color (#FC5858)
- **Screen Readers**: Properly announced as button elements
- **Disabled State**: Properly handles disabled state with reduced opacity

## Design Tokens

- **Colors**:
  - Primary: `#FC5858` (brand red)
  - Secondary: Transparent with `#FC5858` border
  - Focus ring: `#FC5858`
- **Typography**: Uses `font-semibold` for button text
- **Spacing**: Uses Tailwind's default padding with `px-4 py-2`
- **Border Radius**: `rounded-lg` for consistent corner radius
- **Transitions**: Smooth color transitions on hover and active states

## States

1. **Default**: Normal button appearance
2. **Hover**: Slightly darker background for primary, inverted colors for secondary
3. **Active**: Even darker background when pressed
4. **Focus**: Clear focus ring with brand color
5. **Disabled**: Reduced opacity and no pointer events

## Best Practices

- Use primary variant for main actions
- Use secondary variant for secondary or cancel actions
- Always provide meaningful text content
- Use appropriate ARIA labels for complex buttons
- Test keyboard navigation and screen reader compatibility

## Related Components

- Link components for navigation
- Icon buttons for actions without text
- Form submit buttons
