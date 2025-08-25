# Product Requirements Document: Storybook Setup and UI Component Documentation

## Introduction/Overview

This PRD outlines the implementation of Storybook for the Next.js application to enable isolated component development and testing. The goal is to create a simple, maintainable component development environment that showcases existing UI components with basic documentation and interactive stories.

## Goals

1. **Set up Storybook** with Next.js and TypeScript support for isolated component development
2. **Create stories for existing UI components** in the `web/src/components/ui/` folder
3. **Organize components in individual folders** with component, documentation, and stories together
4. **Enable basic component testing** with interactive controls and actions
5. **Maintain simple, clear documentation** for each component

## User Stories

1. **As a developer**, I want to view and test UI components in isolation so that I can develop them without the complexity of the full application.

2. **As a developer**, I want to see component documentation with props and usage examples so that I can understand how to use each component correctly.

3. **As a developer**, I want to interact with components using Storybook controls so that I can test different prop combinations and states.

4. **As a team member**, I want to have a centralized place to view all UI components so that I can understand the available components.

## Functional Requirements

### 1. Storybook Setup

- Install Storybook with Next.js and TypeScript support
- Configure Storybook to work with existing Tailwind CSS setup
- Set up essential addons: controls, actions, and docs
- Configure basic design system integration

### 2. Component Organization

- Reorganize existing components into individual folders
- Each component folder should contain: component file, documentation, and stories
- Maintain existing component functionality while improving organization

### 3. Story Creation

- Create stories for all existing UI components
- Include default, variant, and state stories for each component
- Add interactive controls for component props
- Include basic action handlers for interactive components

### 4. Documentation

- Create simple documentation for each component
- Include props interface and basic usage examples
- Keep documentation concise and actionable

### 5. Cleanup Unused Components

- Remove unused components from the codebase
- Clean up any related files and references
- Ensure no broken imports remain

## Non-Goals (Out of Scope)

- Advanced Storybook addons beyond controls, actions, and docs
- Visual regression testing setup
- Automated screenshot testing
- Component performance testing
- Complex animation testing
- Integration with external design tools
- Automated component generation from design files
- Complex documentation workflows

## Design Considerations

### Used Components to Organize

Based on analysis of the codebase, the following components are actively used and need to be organized into individual folders:

1. **button.tsx** - Basic button component ✅ (already has stories)
2. **input.tsx** - Form input component ✅ (already has stories)
3. **card.tsx** - Card container component (used in staff sections)
4. **badge.tsx** - Status badge component (used in StaffProfileSection)
5. **select.tsx** - Dropdown select component (used in InvitationModal)
6. **loading-spinner.tsx** - Loading indicator component (used in multiple sections)
7. **error-message.tsx** - Error display component (used in staff pages)
8. **generic-table.tsx** - Generic table component (used in UserTable and StaffTableNew)
9. **toast.tsx** - Notification toast component (used by toaster and hooks)

### Unused Components (To be deleted):

- UserProfile.tsx, dropdown-menu.tsx, tabs.tsx, label.tsx, dialog.tsx, DataTable.tsx, NavigationItem.tsx, toaster.tsx

### Component Organization Structure

Each component should be organized as:

```
components/ui/
├── Button/
│   ├── Button.tsx
│   ├── Button.md
│   └── Button.stories.tsx
├── Input/
│   ├── Input.tsx
│   ├── Input.md
│   └── Input.stories.tsx
└── ...
```

## Technical Considerations

### Dependencies

- Storybook 9.x with Next.js support ✅ (already installed)
- TypeScript configuration compatibility ✅ (already configured)
- Tailwind CSS integration ✅ (already configured)

### Configuration Requirements

- Next.js configuration integration ✅ (already configured)
- TypeScript path mapping support ✅ (already configured)
- Tailwind CSS class compilation ✅ (already configured)

### Performance Considerations

- Basic Storybook performance optimization
- Fast refresh support for development
- Efficient component tree rendering

## Success Metrics

1. **Component Organization**: All used UI components organized into individual folders
2. **Story Coverage**: 100% of used UI components have Storybook stories
3. **Documentation Coverage**: All used components have basic documentation
4. **Development Efficiency**: Reduced time to understand and use components
5. **Team Adoption**: Developers can use Storybook for component development

## Open Questions

1. Should we include component testing examples in the documentation?
2. Do we need to set up automated documentation deployment?
3. Should we integrate Storybook with the existing CI/CD pipeline?

## Implementation Phases

### Phase 1: Component Organization

- Reorganize existing components into individual folders
- Move existing stories and documentation to component folders
- Update import paths and references

### Phase 2: Story Creation

- Create stories for remaining components
- Add interactive controls and actions
- Test basic functionality

### Phase 3: Documentation

- Create simple documentation for each component
- Include props interface and usage examples
- Keep documentation concise and actionable

### Phase 4: Cleanup

- Remove unused components from the codebase
- Clean up any related files and references
- Ensure no broken imports remain

## File Structure

```
web/src/
├── setups/
│   └── storybook/
│       ├── README.md                    # Storybook setup guide
│       ├── ComponentTemplate.md         # Documentation template
│       └── ComponentTemplate.stories.tsx # Story template
├── components/ui/
│   ├── Button/
│   │   ├── Button.tsx                   # Component implementation
│   │   ├── Button.md                    # Component documentation
│   │   └── Button.stories.tsx           # Component stories
│   ├── Input/
│   │   ├── Input.tsx                    # Component implementation
│   │   ├── Input.md                     # Component documentation
│   │   └── Input.stories.tsx            # Component stories
│   └── ...                              # Other component folders
└── package.json                         # Already has Storybook scripts
```

## Acceptance Criteria

1. **Storybook Setup**: Storybook runs successfully with `npm run storybook` ✅ (already working)
2. **Component Organization**: All 9 used UI components organized into individual folders
3. **Story Coverage**: All 9 used UI components have Storybook stories
4. **Interactive Testing**: Component props can be tested via Storybook controls
5. **Documentation**: All used components have basic, clear documentation
6. **Cleanup**: All unused components removed from the codebase
7. **Development Workflow**: Developers can use Storybook for component development
