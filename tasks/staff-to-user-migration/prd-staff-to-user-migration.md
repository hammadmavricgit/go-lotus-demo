# Product Requirements Document: Staff to User Entity Migration

## Introduction/Overview

This PRD outlines the migration from a separate Staff entity to using the existing User entity with role-based filtering for staff management functionality. The goal is to consolidate the data model by using a single User entity while maintaining all existing staff listing functionality and user experience.

**Problem Statement:** Currently, the application uses separate Staff and User entities, creating data duplication and complexity. The Staff entity has been removed from the backend, requiring the frontend to use the User entity with role-based filtering.

**Goal:** Migrate all staff-related functionality to use the User entity while maintaining identical frontend functionality and user experience.

## Goals

1. **Data Consolidation:** Eliminate data duplication by using a single User entity for all user management
2. **Functional Preservation:** Maintain all existing staff listing functionality (search, filter, pagination, sorting)
3. **Role-Based Filtering:** Implement proper filtering to show only users with "staff" role in staff listings
4. **API Integration:** Seamlessly integrate with existing `/Users` API endpoints
5. **Zero UI Changes:** Preserve exact user interface and experience
6. **Admin Access:** Ensure admin users can view all users (both staff and admin) in appropriate contexts

## User Stories

1. **As an admin user**, I want to view all staff members in the staff listing so that I can manage them effectively
2. **As an admin user**, I want to search and filter staff members so that I can quickly find specific users
3. **As an admin user**, I want to see paginated results so that I can navigate through large lists of staff
4. **As an admin user**, I want to sort staff by different fields so that I can organize the data as needed
5. **As an admin user**, I want to view all users (staff and admin) in user management so that I can manage the entire system

## Functional Requirements

### 1. API Integration

1.1. The system must use the existing `/Users` API endpoint for all staff-related data fetching
1.2. The system must apply role-based filtering (`role=staff`) to show only staff users in staff listings
1.3. The system must maintain the same API response structure and pagination format
1.4. The system must support all existing query parameters (search, pagination, sorting)

### 2. Data Mapping

2.1. The system must map User entity fields to staff display fields:

- `firstName + lastName` → Staff Name
- `title` → Title
- `phone` → Mobile Phone
- `supervisor` → Supervisor
- `status` → Status
  2.2. The system must handle missing or null fields gracefully with appropriate fallbacks

### 3. Frontend Functionality

3.1. The system must maintain identical UI/UX for staff listing page
3.2. The system must preserve all existing search functionality
3.3. The system must preserve all existing filtering (by status: Current/Archived/All)
3.4. The system must preserve all existing sorting functionality
3.5. The system must preserve all existing pagination functionality
3.6. The system must maintain the same loading states and error handling

### 4. Role-Based Access

4.1. The system must show only users with "staff" role in staff listings
4.2. The system must allow admin users to view all users (staff and admin) in user management
4.3. The system must maintain existing authentication and authorization logic

### 5. Data Consistency

5.1. The system must ensure data consistency between staff listings and user management
5.2. The system must handle role changes appropriately (e.g., when a user role changes from staff to admin)

## Non-Goals (Out of Scope)

1. **UI/UX Changes:** No modifications to the visual design, layout, or user interface
2. **New Features:** No addition of new functionality beyond what currently exists
3. **Performance Optimization:** No performance improvements beyond what's necessary for the migration
4. **Data Migration:** No migration of existing data (Staff entity is already removed)
5. **Component Renaming:** No changes to component names, file names, or variable names
6. **Navigation Changes:** No updates to page titles, breadcrumbs, or navigation structure

## Design Considerations

- **Maintain Existing Design:** All UI components must remain visually identical
- **Responsive Behavior:** Maintain existing responsive design and table scrolling behavior
- **Loading States:** Preserve existing loading animations and skeleton states
- **Error Handling:** Maintain existing error messages and user feedback

## Technical Considerations

### Backend Integration

- **API Endpoint:** Use existing `/Users` endpoint with appropriate filters
- **Filter Syntax:** Use `role||eq||staff` filter for staff listings
- **Response Format:** Ensure API responses match expected frontend structure
- **Pagination:** Maintain existing pagination parameters and response format

### Frontend Changes

- **API Calls:** Update all staff-related API calls to use `/Users` endpoint
- **Data Transformation:** Map User entity response to existing staff data structure
- **State Management:** Update any staff-related state management to work with User data
- **Type Definitions:** Update TypeScript interfaces to reflect User entity structure

### Data Flow

1. Frontend requests staff data from `/Users?filter=role||eq||staff`
2. Backend returns User entities with role="staff"
3. Frontend transforms User data to match existing staff display format
4. UI renders data using existing components and styling

## Success Metrics

1. **Functional Parity:** 100% of existing staff listing functionality works identically
2. **Data Accuracy:** All staff users are correctly displayed with accurate information
3. **Performance:** No degradation in page load times or user interaction responsiveness
4. **User Experience:** Zero user-facing changes or disruptions
5. **Admin Access:** Admin users can successfully view and manage all users

## Open Questions

1. **Field Mapping Validation:** Are there any edge cases in field mapping that need special handling?
2. **Role Changes:** How should the system handle users whose roles change from staff to admin (or vice versa)?
3. **Data Validation:** Are there any data quality issues in the User entity that might affect staff display?
4. **Caching Strategy:** Should we implement any caching for frequently accessed staff data?

## Implementation Notes

- **Backward Compatibility:** Ensure the migration doesn't break any existing functionality
- **Testing Strategy:** Test with various user roles and data scenarios
- **Rollback Plan:** Maintain ability to quickly revert if issues arise
- **Monitoring:** Monitor for any performance or data accuracy issues post-migration
