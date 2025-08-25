# Task List: Staff to User Entity Migration

## Relevant Files

- `web/src/app/api/staff/route.ts` - Current staff API endpoint that needs to be updated to use Users endpoint
- `web/src/hooks/useStaff.ts` - Staff data management hook that needs to be refactored to use User data
- `web/src/lib/types/staff.ts` - Staff type definitions that need to be updated or mapped to User types
- `web/src/app/staff/page.tsx` - Staff listing page that needs to use User data instead of Staff data
- `web/src/components/staff/StaffTable.tsx` - Staff table component that needs to display User data
- `web/src/components/staff/StaffSearch.tsx` - Staff search component that needs to work with User search
- `web/src/components/staff/StaffTabs.tsx` - Staff tabs component that needs to filter User data by status
- `web/src/components/staff/StaffPagination.tsx` - Staff pagination component that needs to work with User pagination
- `web/src/app/api/users/route.ts` - Existing Users API endpoint that will be used for staff data
- `web/src/hooks/useUsers.ts` - Existing Users hook that can be leveraged for staff functionality
- `web/src/lib/types/user.ts` - User type definitions (if exists) that need to be reviewed for field mapping

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `useStaff.ts` and `useStaff.test.ts` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Update API Integration Layer

  - [x] 1.1 Update staff API route to use Users endpoint with role filtering
  - [x] 1.2 Modify API response structure to match existing staff format
  - [x] 1.3 Update query parameter handling for role-based filtering
  - [x] 1.4 Ensure pagination parameters work correctly with Users endpoint
  - [x] 1.5 Update search functionality to work with User entity fields
  - [x] 1.6 Test API integration with backend Users endpoint

- [x] 2.0 Refactor Data Management Hook

  - [x] 2.1 Update useStaff hook to use Users API instead of Staff API
  - [x] 2.2 Modify fetchStaff function to apply role=staff filter
  - [x] 2.3 Update data transformation to map User fields to Staff display format
  - [x] 2.4 Ensure all existing hook methods (createStaff, createBulkStaff) work with User entity
  - [x] 2.5 Update error handling and loading states for User API responses
  - [x] 2.6 Maintain backward compatibility with existing component interfaces

- [x] 3.0 Update Frontend Components

  - [x] 3.1 Update StaffTable component to handle User data structure
  - [x] 3.2 Modify StaffSearch component to work with User search fields
  - [x] 3.3 Update StaffTabs component to filter User data by status
  - [x] 3.4 Ensure StaffPagination works with User pagination response
  - [x] 3.5 Update staff page to use refactored useStaff hook
  - [x] 3.6 Verify all UI components maintain identical appearance and behavior

- [x] 4.0 Implement Data Transformation Layer

  - [x] 4.1 Create utility functions to map User entity to Staff display format
  - [x] 4.2 Handle field mapping: firstName+lastName → name, phone → mobilePhone, etc.
  - [x] 4.3 Implement graceful handling of missing or null User fields
  - [x] 4.4 Create type definitions for transformed data structure
  - [x] 4.5 Ensure data consistency between User and Staff representations
  - [x] 4.6 Add validation for required fields and data integrity

- [x] 5.0 Testing and Validation
  - [x] 5.1 Test staff listing with role=staff filter
  - [x] 5.2 Verify search functionality works with User fields
  - [x] 5.3 Test pagination with User API response format
  - [x] 5.4 Validate sorting functionality with User entity fields
  - [x] 5.5 Test status filtering (Current/Archived) with User status field
  - [x] 5.6 Verify admin users can see all users in user management
  - [x] 5.7 Test error handling and loading states
  - [x] 5.8 Validate that no UI/UX changes are introduced
