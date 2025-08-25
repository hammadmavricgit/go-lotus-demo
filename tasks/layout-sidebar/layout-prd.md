# Product Requirement Document: Base Layout Component

## 1. Executive Summary
Create a responsive base layout component (`layout.tsx`) that serves as the foundation for all pages in the application, featuring a collapsible sidebar navigation and main content area that matches the Figma design exactly.

## 2. Business Objectives
- Provide a consistent user experience across all pages
- Enable efficient navigation between different sections
- Support responsive design for all device types
- Maintain visual consistency with the established design system

## 3. User Stories

### 3.1 Primary User Stories
- **As a user**, I want to navigate between different sections of the application using a clear sidebar menu
- **As a user**, I want the layout to adapt to my device screen size for optimal viewing
- **As a user**, I want to collapse/expand the sidebar to maximize content viewing area
- **As a user**, I want to see my profile information and logout option easily accessible

### 3.2 Secondary User Stories
- **As a user**, I want to access the application on mobile devices with touch-friendly navigation
- **As a user**, I want keyboard navigation support for accessibility
- **As a user**, I want smooth transitions when the sidebar opens/closes

## 4. Functional Requirements

### 4.1 Core Features
1. **Sidebar Navigation**
   - Fixed width of 280px on desktop
   - Collapsible functionality
   - Active state indicators
   - User profile section at bottom

2. **Main Content Area**
   - Flexible width that adapts to sidebar state
   - Responsive padding and margins
   - Scrollable content area

3. **Responsive Design**
   - Desktop: Sidebar always visible
   - Tablet: Collapsible sidebar with hamburger menu
   - Mobile: Overlay navigation with backdrop

### 4.2 Navigation Items
- Data Tracker (Primary button style)
- Client Goals (Secondary button style)
- Clients (with active state)
- Staff
- Schedule
- Reports
- Settings
- My Profile (with dropdown indicator)
- Help (with dropdown indicator)
- Control Center (with dropdown indicator)

## 5. Non-Functional Requirements

### 5.1 Performance
- Initial page load time: <2 seconds
- Sidebar toggle animation: <300ms
- Smooth 60fps animations

### 5.2 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Minimum touch target size: 44px on mobile

### 5.3 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 6. Technical Specifications

### 6.1 Design System
```css
/* Colors */
--color-primary-coral: #FC5858;
--color-black: #11151B;
--color-white: #FFFFFF;
--color-secondary-bg: #F4EDE2;
--color-neutral-800: #191D23;
--color-neutral-400: #A0ABBB;
--color-tertiary-sun: #FCA311;

/* Typography */
--font-family: 'Manrope', sans-serif;
--font-size-h2: 36px;
--font-size-button: 18px;
--font-size-body: 16px;
--font-size-body-small: 14px;
```

### 6.2 Breakpoints
- Mobile: <768px
- Tablet: 768px - 1024px
- Desktop: >1024px

### 6.3 Technology Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- React Context (for state management)

## 7. User Interface Requirements

### 7.1 Visual Design
- Pixel-perfect match with Figma design
- Consistent spacing and typography
- Proper color contrast ratios
- Smooth transitions and animations

### 7.2 Interactive States
- Hover effects on navigation items
- Active state highlighting
- Focus indicators for accessibility
- Loading states for dynamic content

### 7.3 Layout Behavior
- Sidebar collapse/expand with smooth animation
- Content area adjustment based on sidebar state
- Mobile overlay with backdrop blur
- Proper z-index management

## 8. Data Requirements

### 8.1 Static Data
- Navigation menu items
- User profile information (static for now)
- Logo and branding assets

### 8.2 State Management
- Sidebar open/closed state
- Active navigation item
- Responsive breakpoint detection
- User authentication status (placeholder)

## 9. Integration Requirements

### 9.1 Internal Dependencies
- Next.js routing system
- Global CSS variables
- Component library (shadcn/ui)

### 9.2 External Dependencies
- Lucide React icons
- Manrope font family
- Tailwind CSS framework

## 10. Security Requirements
- No sensitive data in client-side state
- Proper input sanitization
- Secure routing implementation

## 11. Testing Requirements

### 11.1 Unit Testing
- Component rendering tests
- State management tests
- Utility function tests

### 11.2 Integration Testing
- Layout component integration
- Responsive behavior testing
- Navigation functionality testing

### 11.3 E2E Testing
- Cross-browser compatibility
- Mobile device testing
- Accessibility compliance testing

## 12. Deployment Requirements
- Build optimization for production
- Asset optimization (images, fonts)
- Performance monitoring setup

## 13. Success Criteria

### 13.1 Functional Success
- All navigation items work correctly
- Responsive design works on all target devices
- Sidebar collapse/expand functions smoothly
- No console errors or warnings

### 13.2 Performance Success
- Lighthouse score >90 for performance
- First Contentful Paint <1.5s
- Cumulative Layout Shift <0.1

### 13.3 Accessibility Success
- WCAG 2.1 AA compliance verified
- Keyboard navigation fully functional
- Screen reader compatibility confirmed

### 13.4 Visual Success
- Pixel-perfect match with Figma design
- Consistent appearance across browsers
- Smooth animations and transitions

## 14. Risk Assessment

### 14.1 Technical Risks
- **Risk**: Complex responsive behavior
  - **Mitigation**: Thorough testing on multiple devices

- **Risk**: Performance impact of animations
  - **Mitigation**: Optimize animations and use CSS transforms

### 14.2 Design Risks
- **Risk**: Design inconsistencies across breakpoints
  - **Mitigation**: Comprehensive design review and testing

## 15. Acceptance Criteria

### 15.1 Must Have
- [ ] Sidebar navigation with all specified menu items
- [ ] Responsive design for all breakpoints
- [ ] Collapsible sidebar functionality
- [ ] Pixel-perfect match with Figma design
- [ ] WCAG 2.1 AA accessibility compliance

### 15.2 Should Have
- [ ] Smooth animations and transitions
- [ ] Keyboard navigation support
- [ ] Performance optimization
- [ ] Cross-browser compatibility

### 15.3 Could Have
- [ ] Advanced animations
- [ ] Custom scrollbars
- [ ] Theme switching capability

## 16. Component Structure

### 16.1 File Organization
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── MainContent.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   └── ui/
│       ├── Button.tsx
│       ├── NavigationItem.tsx
│       └── UserProfile.tsx
├── styles/
│   ├── globals.css
│   └── variables.css
└── app/
    └── layout.tsx
```

### 16.2 Component Interfaces
```typescript
interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeRoute: string;
}

interface MainContentProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
}

interface LayoutState {
  isSidebarOpen: boolean;
  activeRoute: string;
  isMobile: boolean;
}
```

## 17. Design Specifications

### 17.1 Sidebar Design
- **Background**: #F4EDE2 (Secondary BG)
- **Width**: 280px (desktop), full width (mobile overlay)
- **Height**: 100vh
- **Padding**: 16px vertical, 0px horizontal
- **Logo Section**: Centered, 45px height
- **Navigation Items**: 56px height each
- **User Profile**: 75px height at bottom

### 17.2 Navigation Item States
- **Default**: #000101 text, transparent background
- **Active**: #FC5858 text, rgba(252,88,88,0.12) background
- **Hover**: Light background highlight
- **Icon Size**: 32px x 32px
- **Text Size**: 16px, Manrope Regular

### 17.3 Button Styles
- **Primary**: #FC5858 background, white text, 52px height
- **Secondary**: Transparent background, #FC5858 border and text, 52px height
- **Border Radius**: 8px
- **Padding**: 16px horizontal, 11px vertical

### 17.4 Main Content Area
- **Background**: #FFFFFF
- **Padding**: 16px (mobile), 24px (tablet), 32px (desktop)
- **Min Height**: 100vh
- **Flex**: 1 (grow to fill available space)

## 18. Responsive Behavior

### 18.1 Mobile (<768px)
- Sidebar becomes overlay with backdrop
- Hamburger menu in header
- Full-width main content
- Touch-friendly navigation items

### 18.2 Tablet (768px - 1024px)
- Collapsible sidebar with hamburger toggle
- Main content adjusts to sidebar state
- Maintains desktop navigation structure

### 18.3 Desktop (>1024px)
- Sidebar always visible
- Optional collapse functionality
- Full layout with proper spacing

## 19. Accessibility Features

### 19.1 Keyboard Navigation
- Tab navigation through all interactive elements
- Enter/Space to activate buttons
- Escape to close mobile sidebar
- Arrow keys for navigation items

### 19.2 Screen Reader Support
- Proper ARIA labels for all interactive elements
- Semantic HTML structure
- Descriptive alt text for icons
- Announcement of sidebar state changes

### 19.3 Focus Management
- Visible focus indicators
- Logical tab order
- Focus trap in mobile sidebar
- Focus restoration when sidebar closes

## 20. Performance Considerations

### 20.1 Optimization Strategies
- Lazy loading of non-critical components
- CSS-in-JS optimization
- Icon sprite sheets
- Minimal re-renders with React.memo

### 20.2 Animation Performance
- Use CSS transforms instead of layout properties
- Hardware acceleration for smooth animations
- Debounced resize handlers
- Optimized transition timing

This PRD provides a comprehensive specification for implementing the base layout component that will serve as the foundation for the entire application while maintaining exact visual fidelity to the Figma design. 