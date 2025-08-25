# Storybook Setup and UI Component Documentation - Tasks

## Summary

This document tracks the implementation of Storybook setup and UI component organization for the Next.js application. The goal is to organize existing components into individual folders with stories and documentation, building on what's already been completed.

## Tasks

### Phase 1: Component Organization

- [x] 1.1 Organize Button component

  - [x] Create `web/src/components/ui/Button/` folder
  - [x] Move `button.tsx` to `Button/Button.tsx`
  - [x] Move `button.md` to `Button/Button.md`
  - [x] Move `button.stories.tsx` to `Button/Button.stories.tsx`
  - [x] Update import paths in other files

- [x] 1.2 Organize Input component

  - [x] Create `web/src/components/ui/Input/` folder
  - [x] Move `input.tsx` to `Input/Input.tsx`
  - [x] Move `input.md` to `Input/Input.md`
  - [x] Move `input.stories.tsx` to `Input/Input.stories.tsx`
  - [x] Update import paths in other files

- [x] 1.3 Create component folders for remaining components

  - [x] Create folders for all remaining components
  - [x] Move component files to their respective folders
  - [x] Update import paths throughout the application
  - [x] Test that all imports work correctly

### Phase 2: Story Creation

- [x] 2.1 Create stories for used components

  - [x] card.tsx - Card container component (used in staff sections)
  - [x] badge.tsx - Status badge component (used in StaffProfileSection)
  - [x] select.tsx - Dropdown select component (used in InvitationModal)

- [x] 2.2 Create stories for feedback components

  - [x] loading-spinner.tsx - Loading indicator component (used in multiple sections)
  - [x] error-message.tsx - Error display component (used in staff pages)
  - [x] toast.tsx - Notification toast component (used by toaster and hooks)

- [x] 2.3 Create stories for complex components

  - [x] generic-table.tsx - Generic table component (used in UserTable and StaffTableNew)

- [ ] 2.4 Update existing documentation
  - [ ] Review and enhance generic-table-README.md
  - [ ] Ensure consistency across all documentation

### Phase 3: Documentation

- [x] 3.1 Create documentation for used components

  - [x] card.tsx - Card container component (used in staff sections)
  - [x] badge.tsx - Status badge component (used in StaffProfileSection)
  - [x] select.tsx - Dropdown select component (used in InvitationModal)

- [x] 3.2 Create documentation for feedback components

  - [x] loading-spinner.tsx - Loading indicator component (used in multiple sections)
  - [x] error-message.tsx - Error display component (used in staff pages)
  - [x] toast.tsx - Notification toast component (used by toaster and hooks)

- [x] 3.3 Create documentation for complex components

  - [x] generic-table.tsx - Generic table component (used in UserTable and StaffTableNew)

- [ ] 3.4 Update existing documentation
  - [ ] Review and enhance generic-table-README.md
  - [ ] Ensure consistency across all documentation

### Phase 4: Quality Assurance and Testing

- [x] 4.1 Test component organization

  - [x] Verify all components load correctly after reorganization
  - [x] Test that all import paths work correctly
  - [x] Verify Storybook stories load without errors
  - [x] Test interactive controls for all components

- [x] 4.2 Review documentation quality

  - [x] Ensure all components have basic documentation
  - [x] Verify props interfaces are accurate
  - [x] Check usage examples are working
  - [x] Review documentation consistency

- [x] 4.3 Final testing
  - [x] Test Storybook performance
  - [x] Verify all components are accessible
  - [x] Test responsive behavior
  - [x] Ensure development workflow works smoothly

### Phase 5: Cleanup Unused Components

- [x] 5.1 Remove unused component files

  - [x] Delete UserProfile.tsx
  - [x] Delete dropdown-menu.tsx
  - [x] Delete tabs.tsx
  - [x] Delete label.tsx
  - [x] Delete dialog.tsx
  - [x] Delete DataTable.tsx
  - [x] Delete NavigationItem.tsx (RESTORED - needed for sidebar navigation)
  - [x] Delete toaster.tsx (DELETED - not used anywhere)

- [x] 5.2 Clean up references and imports

  - [x] Search for any remaining imports of deleted components
  - [x] Remove any unused imports
  - [x] Update any configuration files that reference deleted components
  - [x] Test that application builds and runs without errors

- [x] 5.3 Verify cleanup
  - [x] Confirm no broken imports remain
  - [x] Test that all used components still work correctly
  - [x] Verify Storybook loads without errors
  - [x] Check that application functionality is not affected

## Notes

- Storybook is already set up and working ✅
- Button and Input components already have stories and documentation ✅
- Focus on organizing components into individual folders
- Keep documentation simple and actionable
- Maintain existing component functionality while improving organization
- Use templates from `web/src/setups/storybook/` for new components
- Remove unused components to keep codebase clean and maintainable

## Success Criteria

- [x] Storybook runs successfully with `npm run storybook` ✅
- [x] All 9 used UI components organized into individual folders ✅
- [x] All 9 used UI components have Storybook stories ✅
- [x] All 9 used UI components have basic documentation ✅
- [x] Interactive controls work for all component props ✅
- [x] Documentation is clear and actionable ✅
- [x] Component organization improves development workflow ✅
- [x] All 7 unused components removed from codebase ✅
- [x] Team can use Storybook for component development ✅
