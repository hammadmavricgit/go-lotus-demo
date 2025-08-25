# Tabs Component

## Purpose

The Tabs component is a tabbed interface built on top of Radix UI's Tabs primitive. It provides an accessible way to organize content into multiple sections that users can navigate between. The component automatically handles keyboard navigation, focus management, and ARIA attributes for screen readers.

## Props

### Tabs (Root)

- Extends `TabsPrimitive.Root` props
- Controls the active tab state and tab switching behavior
- Accepts `defaultValue` for initial active tab
- Accepts `value` and `onValueChange` for controlled usage

### TabsList

- Extends `TabsPrimitive.List` props
- Container for all tab triggers
- Handles the visual layout and styling of the tab navigation

### TabsTrigger

- Extends `TabsPrimitive.Trigger` props
- Individual tab button that users click to switch tabs
- Automatically manages active state and accessibility
- Accepts `value` prop to identify which tab it represents

### TabsContent

- Extends `TabsPrimitive.Content` props
- Container for the content of each tab
- Only the active tab's content is rendered
- Accepts `value` prop to match with corresponding trigger

## Usage Examples

### Basic Tabs

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/Tabs/Tabs';

<Tabs defaultValue='account' className='w-[400px]'>
  <TabsList>
    <TabsTrigger value='account'>Account</TabsTrigger>
    <TabsTrigger value='password'>Password</TabsTrigger>
  </TabsList>
  <TabsContent value='account'>
    <p>Account settings and preferences go here.</p>
  </TabsContent>
  <TabsContent value='password'>
    <p>Password change form goes here.</p>
  </TabsContent>
</Tabs>;
```

### Controlled Tabs

```tsx
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/Tabs/Tabs';

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value='tab1'>First Tab</TabsTrigger>
        <TabsTrigger value='tab2'>Second Tab</TabsTrigger>
        <TabsTrigger value='tab3'>Third Tab</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <p>Content for first tab</p>
      </TabsContent>
      <TabsContent value='tab2'>
        <p>Content for second tab</p>
      </TabsContent>
      <TabsContent value='tab3'>
        <p>Content for third tab</p>
      </TabsContent>
    </Tabs>
  );
}
```

### Tabs with Custom Styling

```tsx
<Tabs defaultValue='overview' className='w-full'>
  <TabsList className='grid w-full grid-cols-3'>
    <TabsTrigger value='overview'>Overview</TabsTrigger>
    <TabsTrigger value='analytics'>Analytics</TabsTrigger>
    <TabsTrigger value='reports'>Reports</TabsTrigger>
  </TabsList>
  <TabsContent value='overview' className='mt-6'>
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Overview</h3>
      <p>Your dashboard overview content here.</p>
    </div>
  </TabsContent>
  <TabsContent value='analytics' className='mt-6'>
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Analytics</h3>
      <p>Analytics and metrics content here.</p>
    </div>
  </TabsContent>
  <TabsContent value='reports' className='mt-6'>
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Reports</h3>
      <p>Reports and data content here.</p>
    </div>
  </TabsContent>
</Tabs>
```

### Tabs with Icons

```tsx
import { Settings, User, Bell } from 'lucide-react';

<Tabs defaultValue='settings' className='w-[400px]'>
  <TabsList>
    <TabsTrigger value='settings' className='flex items-center gap-2'>
      <Settings className='h-4 w-4' />
      Settings
    </TabsTrigger>
    <TabsTrigger value='profile' className='flex items-center gap-2'>
      <User className='h-4 w-4' />
      Profile
    </TabsTrigger>
    <TabsTrigger value='notifications' className='flex items-center gap-2'>
      <Bell className='h-4 w-4' />
      Notifications
    </TabsTrigger>
  </TabsList>
  <TabsContent value='settings'>
    <p>Settings configuration options.</p>
  </TabsContent>
  <TabsContent value='profile'>
    <p>User profile information.</p>
  </TabsContent>
  <TabsContent value='notifications'>
    <p>Notification preferences.</p>
  </TabsContent>
</Tabs>;
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with arrow keys, Home, End, and Enter/Space
- **ARIA Attributes**: Proper ARIA roles, states, and properties
- **Focus Management**: Automatic focus handling when switching tabs
- **Screen Reader Support**: Clear announcements of tab changes
- **Skip Links**: Proper tab order and focus indicators

## Styling and Customization

The component uses Tailwind CSS classes and includes:

- **Responsive Design**: Adapts to different screen sizes
- **Focus States**: Clear visual indicators for keyboard navigation
- **Active States**: Distinct styling for the currently active tab
- **Hover Effects**: Smooth transitions and hover states
- **Customizable**: Easy to override with custom CSS classes

## Best Practices

1. **Use Descriptive Labels**: Make tab names clear and meaningful
2. **Limit Tab Count**: Don't use too many tabs (recommend 2-7)
3. **Consistent Content**: Ensure each tab has similar content structure
4. **Accessible Icons**: When using icons, provide text labels
5. **Proper Spacing**: Use consistent spacing between tabs and content
6. **Mobile Considerations**: Ensure tabs work well on touch devices

## Common Use Cases

- **Settings Pages**: Organize different configuration sections
- **Dashboard Views**: Switch between different data views
- **Form Sections**: Break long forms into logical groups
- **Content Organization**: Group related content by category
- **Navigation**: Alternative to traditional navigation menus

## Dependencies

- `@radix-ui/react-tabs` - Core tabs functionality
- `@/lib/utils` - Utility functions for class merging
- Tailwind CSS for styling

## Performance Considerations

- Only active tab content is rendered
- Efficient focus management
- Minimal re-renders when switching tabs
- Optimized keyboard event handling
