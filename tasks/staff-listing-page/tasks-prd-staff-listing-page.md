# Task List: Staff Listing Page Implementation

## Relevant Files

- `web/src/app/staff/page.tsx` - Main staff listing page component
- `web/src/app/staff/page.test.tsx` - Unit tests for the staff page
- `web/src/components/staff/StaffTable.tsx` - Reusable staff data table component
- `web/src/components/staff/StaffTable.test.tsx` - Unit tests for StaffTable component
- `web/src/components/staff/StaffTabs.tsx` - Tab navigation component for staff filtering
- `web/src/components/staff/StaffTabs.test.tsx` - Unit tests for StaffTabs component
- `web/src/components/staff/StaffSearch.tsx` - Search input component with debouncing
- `web/src/components/staff/StaffSearch.test.tsx` - Unit tests for StaffSearch component
- `web/src/components/staff/StaffPagination.tsx` - Pagination controls component
- `web/src/components/staff/StaffPagination.test.tsx` - Unit tests for StaffPagination component
- `web/src/app/api/staff/route.ts` - API route handler for fetching staff data
- `web/src/app/api/staff/route.test.ts` - Unit tests for staff API route
- `web/src/lib/types/staff.ts` - TypeScript interfaces for staff data
- `web/src/lib/utils/pagination.ts` - Utility functions for pagination logic
- `web/src/lib/utils/pagination.test.ts` - Unit tests for pagination utilities
- `web/src/lib/utils/search.ts` - Utility functions for search functionality
- `web/src/lib/utils/search.test.ts` - Unit tests for search utilities
- `web/src/hooks/useStaff.ts` - Custom hook for staff data management
- `web/src/hooks/useStaff.test.ts` - Unit tests for useStaff hook

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- The staff page will be accessible via the existing sidebar navigation at `/staff` route.
- All components should follow the existing design system using Manrope font and the established color palette.
- The implementation should be responsive and work on desktop, tablet, and mobile devices.

## Tasks

- [x] 0.0 Set up backend Staff entity and API endpoints
  - [x] 0.1 Add Staff entity to backend `.apsorc` file with required fields
  - [x] 0.2 Define Staff entity fields: name, title, mobilePhone, status, supervisor
  - [x] 0.3 Run `apso server scaffold` command to generate backend CRUD
  - [x] 0.4 Verify generated API endpoints for staff operations
  - [x] 0.5 Test staff API endpoints for data fetching
- [x] 1.0 Set up project structure and routing
  - [x] 1.1 Create staff page directory structure (`web/src/app/staff/`)
  - [x] 1.2 Create main staff page component (`web/src/app/staff/page.tsx`)
  - [x] 1.3 Set up basic page layout with header and container
  - [x] 1.4 Add page metadata and SEO tags
  - [x] 1.5 Create staff components directory (`web/src/components/staff/`)
  - [x] 1.6 Update sidebar navigation to highlight staff page when active
- [x] 2.0 Create staff data types and API integration
  - [x] 2.1 Define TypeScript interfaces for staff data (`web/src/lib/types/staff.ts`)
  - [x] 2.2 Create staff API route handler (`web/src/app/api/staff/route.ts`)
  - [x] 2.3 Implement pagination query parameters handling
  - [x] 2.4 Add search parameter support to API route
  - [x] 2.5 Create custom hook for staff data management (`web/src/hooks/useStaff.ts`)
  - [x] 2.6 Add error handling and loading states to API integration
- [x] 3.0 Build core UI components
  - [x] 3.1 Create StaffTable component with proper column structure
  - [x] 3.2 Implement table header with sortable columns (Staff Name, Title, Supervisor)
  - [x] 3.3 Add table row styling with alternating colors and hover states
  - [x] 3.4 Create StaffTabs component for status filtering
  - [x] 3.5 Implement tab switching logic and active state styling
  - [x] 3.6 Create StaffSearch component with search icon and placeholder
  - [x] 3.7 Add "Add Staff Member" button with proper styling
  - [x] 3.8 Create StaffPagination component with page numbers and navigation
  - [x] 4.0 Implement search and filtering functionality
    - [x] 4.1 Add debounced search functionality to prevent excessive API calls
    - [x] 4.2 Implement search across all fields (Staff Name, Title, Mobile Phone, Status, Supervisor)
    - [x] 4.3 Connect search input to API calls with proper state management
    - [x] 4.4 Implement tab filtering logic (Current Staff, Archived Staff, All Staff)
      - [x] 4.5 Add loading states during search and filter operations
      - [x] 4.6 Create search utility functions (`web/src/lib/utils/search.ts`)
    - [x] 4.7 Add empty state handling when no results are found
  - [x] 5.0 Add pagination and responsive design (COMPLETED) - [x] 5.1 Implement server-side pagination with proper page size (20 items)
    - [x] 5.2 Add pagination controls with previous/next navigation
      - [x] 5.3 Highlight current page with orange background (#FCA311)
      - [x] 5.4 Create pagination utility functions (`web/src/lib/utils/pagination.ts`)
    - [x] 5.5 Make table responsive with horizontal scrolling on mobile
      - [x] 5.6 Ensure search and action buttons remain accessible on all screen sizes
      - [x] 5.7 Add proper focus states and keyboard navigation
    - [x] 5.8 Test responsive design across desktop, tablet, and mobile breakpoints
