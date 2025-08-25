# Product Requirements Document: Staff Listing Page

## Introduction/Overview

The Staff Listing Page is a dedicated view for administrators to browse and search through all staff members in the organization. This feature provides a clean, tabbed interface with search functionality and paginated data display, allowing admins to quickly find and review staff information without the ability to modify data directly.

**Problem Statement:** Administrators need a centralized, easy-to-navigate view of all staff members to quickly access basic information and understand the organizational structure.

**Goal:** Provide administrators with a comprehensive, searchable staff directory that displays key staff information in an organized, paginated table format.

## Goals

1. **Display Staff Information:** Show a comprehensive list of all staff members with their key details
2. **Enable Efficient Search:** Allow administrators to quickly find specific staff members through search functionality
3. **Organize by Status:** Provide tabbed views to filter staff by their current status (Current Staff, Archived Staff, All Staff)
4. **Ensure Performance:** Implement pagination to handle large datasets efficiently
5. **Maintain Read-Only Access:** Provide view-only access to prevent accidental data modifications

## User Stories

1. **As an administrator**, I want to view all staff members in a organized table so that I can quickly scan through the organization's personnel
2. **As an administrator**, I want to search for specific staff members by name, title, or phone number so that I can find information quickly
3. **As an administrator**, I want to filter staff by their status (current vs archived) so that I can focus on relevant staff members
4. **As an administrator**, I want to navigate through pages of staff data so that I can view large datasets without performance issues
5. **As an administrator**, I want to see staff hierarchy through supervisor information so that I can understand reporting relationships

## Functional Requirements

### 1. Page Layout & Navigation

- The page must display a "Staff" header with 36px Manrope SemiBold font
- The page must include three tabs: "Current Staff", "Archived Staff", and "All Staff"
- The active tab must be highlighted with coral color (#FC5858) and underline
- The page must be accessible via the existing sidebar navigation

### 2. Search Functionality

- The page must include a search input field with placeholder text "Type e.g Staff name"
- The search must work across all displayed fields: Staff Name, Title, Mobile Phone, Status, and Supervisor
- The search must be real-time (filter results as user types)
- The search field must include a search icon for visual clarity

### 3. Add Staff Button

- The page must display an "+ Add Staff Member" button in the top-right area
- The button must have coral border and text color (#FC5858)
- The button must be styled as an outlined button with 18px Manrope SemiBold font

### 4. Data Table

- The table must display the following columns:
  - Staff Name (sortable)
  - Title (sortable)
  - Mobile Phone
  - Status
  - Supervisor (sortable)
- The table must have a light beige header background (#f4ede2)
- The table must have alternating row colors for better readability
- Each row must be clickable (for future edit functionality)
- The table must support horizontal scrolling on smaller screens

### 5. Pagination

- The page must implement pagination controls at the bottom of the table
- Pagination must show page numbers (1, 2, 3, 4, 5, ..., 12)
- Pagination must include previous/next navigation arrows
- The current page must be highlighted with orange background (#FCA311)
- Default page size should be 20 items per page

### 6. Status Management

- The "Current Staff" tab must show only active staff members
- The "Archived Staff" tab must show only archived/inactive staff members
- The "All Staff" tab must show all staff members regardless of status
- Status column must display "Current" for active staff and "Archived" for inactive staff

### 7. Responsive Design

- The page must be responsive and work on desktop, tablet, and mobile devices
- The table must adapt to smaller screens with appropriate scrolling
- Search and action buttons must remain accessible on all screen sizes

## Non-Goals (Out of Scope)

1. **Data Modification:** This page will not include edit, delete, or archive functionality
2. **Bulk Actions:** No bulk selection or operations on multiple staff members
3. **Export Functionality:** No PDF or CSV export capabilities
4. **Advanced Filtering:** No additional filters beyond the three main tabs
5. **Staff Profile Photos:** No avatar or profile image display
6. **Real-time Updates:** No live data updates or notifications
7. **External Integrations:** No connections to external HR systems
8. **Approval Workflows:** No approval processes for staff changes

## Design Considerations

### Visual Design

- Follow the existing design system using Manrope font family
- Use the established color palette:
  - Primary Coral: #FC5858
  - Black: #11151B
  - White: #FFFFFF
  - Tertiary Sun: #FCA311
  - Light beige: #f4ede2
- Maintain consistent spacing and typography hierarchy
- Ensure proper contrast ratios for accessibility

### UI Components

- Use existing button and input components from the design system
- Implement consistent table styling with proper borders and spacing
- Ensure tab components match the existing application design
- Use appropriate hover states and focus indicators

## Technical Considerations

### Frontend Implementation

- Build as a Next.js page component using TypeScript
- Implement server-side pagination for performance
- Use React hooks for state management (search, pagination, active tab)
- Implement proper loading states and error handling
- Ensure proper SEO with appropriate meta tags

### Data Management

- Fetch staff data from the existing backend API
- Implement proper error handling for API failures
- Cache search results appropriately to improve performance
- Use proper TypeScript interfaces for staff data structure

### Performance

- Implement virtual scrolling for large datasets if needed
- Optimize search functionality with debouncing
- Ensure fast initial page load times
- Minimize unnecessary re-renders

## Success Metrics

1. **User Engagement:** 90% of admin users access the staff listing page within the first week of deployment
2. **Search Efficiency:** Users can find specific staff members within 3 search attempts
3. **Performance:** Page load time under 2 seconds on average
4. **Usability:** Zero support tickets related to staff listing page navigation or search
5. **Adoption:** 80% of administrators use the staff listing page at least once per week

## Open Questions

1. **Data Source:** What is the current API endpoint for fetching staff data?
2. **Staff Status Logic:** How is staff status determined (active vs archived)?
3. **Supervisor Data:** Is supervisor information stored as a reference to another staff member?
4. **Search Performance:** What is the expected maximum number of staff records?
5. **Mobile Experience:** Should the table be completely responsive or use a different layout on mobile?

## Implementation Priority

**Phase 1 (MVP):**

- Basic staff listing table with all required columns
- Tab navigation (Current Staff, Archived Staff, All Staff)
- Search functionality across all fields
- Basic pagination
- Responsive design

**Phase 2 (Enhancements):**

- Column sorting
- Advanced search filters
