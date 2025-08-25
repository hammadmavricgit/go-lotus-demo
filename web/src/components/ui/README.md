# UI Components Documentation

This directory contains reusable UI components for the application. Each generic and reusable component must follow the documentation and testing requirements outlined below.

## 📋 Component Requirements

### For Every Reusable Component:

1. **Component File** (`ComponentName.tsx`)

   - Main component implementation
   - Proper TypeScript interfaces
   - Accessibility features (ARIA labels, keyboard navigation)

2. **Documentation File** (`ComponentName.md`)

   - Purpose and usage guidelines
   - Props interface documentation
   - Usage examples
   - Accessibility notes
   - Design token usage

3. **Storybook Story** (`ComponentName.stories.tsx`)

   - Multiple story variants
   - Interactive controls
   - Accessibility testing
   - Usage examples

4. **Unit Tests** (`ComponentName.test.tsx`)
   - Component functionality tests
   - Props validation tests
   - Accessibility tests

## 📁 File Structure

```
components/ui/
├── ComponentName.tsx          # Main component
├── ComponentName.md           # Documentation
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests
└── README.md                  # This file
```

## 🎯 Templates

- **Documentation Template**: `web/src/setups/storybook/ComponentTemplate.md`
- **Storybook Template**: `web/src/setups/storybook/ComponentTemplate.stories.tsx`

Copy these templates when creating new components and customize them accordingly.

## 📖 Documentation Guidelines

### Component Documentation (.md file) should include:

- **Overview**: What the component does and when to use it
- **Props**: Complete TypeScript interface with descriptions
- **Usage Examples**: Basic, advanced, and edge case examples
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Design Tokens**: Colors, typography, spacing, breakpoints used
- **Testing**: Links to tests and Storybook stories
- **Related Components**: Similar or related components

### Storybook Stories should include:

- **Default Story**: Basic component usage
- **Variant Stories**: Different visual variants
- **Size Stories**: Different size options
- **State Stories**: Loading, disabled, error states
- **Interactive Stories**: With click handlers and actions
- **Accessibility**: Proper ARIA testing
- **Controls**: Interactive prop testing

## 🧪 Testing Requirements

### Unit Tests:

- Component rendering
- Props validation
- Event handling
- Accessibility features

### Storybook Testing:

- Visual regression testing
- Accessibility testing (a11y addon)
- Interaction testing
- Responsive design testing

## 🎨 Design System Integration

All components must:

- Use the established color palette
- Follow typography guidelines
- Use consistent spacing scale
- Be responsive (mobile-first)
- Support dark/light themes if applicable

## 📱 Accessibility Standards

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meet WCAG AA standards
- **Screen Reader**: Proper semantic markup

## 🚀 Getting Started

1. Copy the templates:

   ```bash
   cp src/setups/storybook/ComponentTemplate.md MyComponent.md
   cp src/setups/storybook/ComponentTemplate.stories.tsx MyComponent.stories.tsx
   ```

2. Customize the templates for your component

3. Implement the component with proper TypeScript interfaces

4. Write comprehensive tests

5. Update documentation with real examples

6. Create Storybook stories with all variants

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Accessibility Testing](https://storybook.js.org/addons/@storybook/addon-a11y/)
- [Design System Guidelines](./design-system.md)
- [Testing Best Practices](./testing.md)
