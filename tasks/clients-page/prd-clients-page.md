# Product Requirements Document: Clients Page

## Introduction/Overview

The Clients page is a comprehensive client management interface that allows staff members to view, search, filter, and add clients to the system. This feature provides a centralized view of all clients with advanced filtering capabilities and a streamlined process for adding new clients through a modal interface.

The page is now fully functional with real backend API integration using APSO-generated CRUD endpoints. It solves the problem of managing client information across different statuses (Current, Waitlisted, Archived) while providing staff members with the ability to focus on their assigned clients or view all clients in the system.

**Implementation Status: ✅ COMPLETED - Fully functional with real backend API integration**

## Goals

1. **Centralized Client Management**: Provide a single interface for viewing and managing all client information
2. **Efficient Client Discovery**: Enable quick search and filtering of clients by various criteria
3. **Streamlined Client Addition**: Simplify the process of adding new clients through an intuitive modal form
4. **Role-Based Access**: Allow staff to view either all clients or only their assigned clients
5. **Responsive Design**: Ensure the interface works seamlessly across desktop and mobile devices

## User Stories

1. **As a staff member**, I want to view all my assigned clients so that I can quickly access their information
2. **As a staff member**, I want to search for specific clients by name so that I can find them quickly
3. **As a staff member**, I want to filter clients by status (Current, Waitlisted, Archived) so that I can focus on relevant clients
4. **As a staff member**, I want to add a new client with basic information so that I can start managing their case
5. **As a staff member**, I want to see which other staff members are associated with a client so that I can coordinate care
6. **As a staff member**, I want to view client medical notes and alerts so that I can provide appropriate care

## Functional Requirements

**Backend Integration**: All requirements below are implemented with real APSO-generated backend APIs and database persistence.

### 1. Header Section
1.1. The page must display "Clients" as the main title with responsive font sizing (24px on mobile, 32px on desktop) at the top of the content area
1.2. The system must provide four horizontal tabs: "Current", "Waitlisted", "Archived", and "All clients"
1.3. The "Current" tab must be active by default when the page loads
1.4. Active tabs must display red text (#FC5858) with a red bottom border, no background color, border radius, or box shadow
1.5. Inactive tabs must display light gray text (#9CA3AF) with no styling
1.6. Tabs must be responsive with smaller padding on mobile (px-2 sm:px-4) and responsive font sizing (14px on mobile, 16px on desktop)
1.7. The system must include a toggle switch labeled "Show only my clients" that toggles between viewing all clients and only assigned clients
1.8. The toggle switch must be positioned immediately after the "All clients" tab on the left side (not on the right)
1.9. The toggle switch must use red (#FC5858) for active state and gray (#E5E7EB) for inactive state
1.10. The header layout must stack vertically on mobile and arrange horizontally on larger screens

### 2. Search Functionality
2.1. The system must provide a search input field below the header section
2.2. The search field must have a fully rounded (pill-shaped) appearance with no background color
2.3. The search field must have 30px left and right padding
2.4. The search field must include a search icon positioned on the left side
2.5. The search field must have the placeholder text "Type e.g Client name"
2.6. The search must filter client rows based on client name and parent email using **case-insensitive** matching
2.7. The search must implement debounced input (300ms delay) to optimize performance
2.8. The search must work in combination with tab filters and the "Show only my clients" toggle
2.9. **✅ IMPLEMENTED**: Search uses backend API with `$contL` operator for case-insensitive partial matching
2.10. The search field must be responsive: full width on mobile, fixed width (320px) on desktop
2.11. The search section must stack vertically on mobile with the Add Client button below the search field

### 3. Add Client Button
3.1. The system must display an "+ Add Client" button positioned at the top-right of the search bar section
3.2. The button must have a red background color (#FC5858) with rounded corners (rounded-xl)
3.3. The button must have a hover state that darkens the background color
3.4. The button must be responsive: full width on mobile, auto width on desktop
3.5. Clicking the button must open the Add Client Modal

### 4. Clients Table
**✅ IMPLEMENTED**: Real-time data loading with APSO backend integration, server-side pagination, and API-driven filtering.

4.1. The system must display a card-based table layout with #F4EDE2 background color and responsive padding (12px on mobile, 24px on desktop)
4.2. Each client row must be displayed as a separate white card with left-side rounded corners only
4.3. Cards must have proper spacing between them to show the background color
4.4. The table must use a CSS Grid layout with fixed column widths for optimal horizontal scrolling
4.5. The table header must be separate from the data rows and use the same background color
4.6. The table must include the following columns with optimized widths for better space utilization:
   - Client Name (180px width, displays full name with truncation)
   - Date of Birth (180px width, must always be formatted as "March 15, 2020" format regardless of input format)
   - Associated Staff (200px width, displays primary staff with red badge for additional staff count)
   - Things to Look Out For (240px width, medical conditions or notes with truncation)
   - Status (140px width, with color-coded badges: red for Current, yellow for Waitlisted, gray for Archived)
4.7. The table must implement horizontal scrolling for smaller screens with a minimum width of 1000px to ensure optimal space utilization
4.8. The table must prevent text wrapping by using truncation and proper whitespace handling
4.9. The table must update dynamically based on tab selection, search filters, and "Show only my clients" toggle
4.10. The table must display approximately 10 rows per page
4.11. The "Show only my clients" toggle must filter clients based on user's first/last name matching associated staff
4.12. All table content must remain within the white card boundaries, preventing overflow on any device size

### 5. Pagination
5.1. The system must display pagination controls inside the table container at the bottom
5.2. Pagination buttons must have no borders for a clean appearance
5.3. Pagination must include left and right arrow navigation with minimum 44px touch targets for mobile accessibility
5.4. Pagination must show page numbers with ellipsis for large page counts (up to 7 visible pages)
5.5. The current page must be highlighted with orange background (#FCA311) and white text
5.6. Inactive pagination buttons must be transparent with hover effects
5.7. Pagination must be responsive with smaller buttons on mobile (36px minimum) and larger on desktop (40px minimum)
5.8. Pagination must include horizontal scrolling for page numbers on very small screens
5.9. Pagination must work correctly with filtered results
5.10. Pagination must automatically reset to page 1 when new clients are added

### 6. Add Client Modal
**✅ IMPLEMENTED**: Real client creation with backend API integration and proper date format handling.

6.1. The modal must be triggered by clicking the "+ Add Client" button
6.2. The modal must have the title "Add Client" (24px font, semibold) at the top left
6.3. The modal must include an "X" close button at the top right
6.4. The modal must use clean borders (#E5E7EB) and modern styling throughout
6.5. The modal must display introductory text: "Quickly add a Client with the below information. To add additional information, please view a Client's Profile after they have been created."
6.6. The modal must include the following form fields:
   - First Name (required, placeholder: "Enter First Name")
   - Last Name (required, placeholder: "Enter Last Name") 
   - Parent e-mail (placeholder: "Enter e-mail")
   - Date of birth (placeholder: "DD/MM/YYYY" with calendar picker icon vertically centered)
   - **✅ ADDED**: Things to Look Out For (placeholder: "Enter any medical conditions, allergies, or notes")
   - Associated Therapist (dropdown/select field)
6.7. The modal must include a calendar widget for date selection with modern styling
6.8. The calendar icon must be properly vertically centered within the date input field
6.9. The modal must include "Add" (red button) and "Cancel" (outline button) at the bottom right
6.10. The modal must close and immediately add the client to the table upon successful submission
6.11. New clients must appear in the table based on their status and current filters
6.12. The modal must implement proper form validation with error messages
6.13. **✅ IMPLEMENTED**: Form automatically converts DD/MM/YYYY input to YYYY-MM-DD format for API compatibility
6.14. **✅ IMPLEMENTED**: Real-time client creation with immediate table refresh and proper error handling

### 7. Modal Accessibility
7.1. The modal must support ESC key to close
7.2. The modal must implement focus trapping
7.3. The modal must have clean transitions and animations
7.4. The modal must be fully accessible according to WCAG guidelines

### 8. Form Validation
8.1. The system must validate required fields (First Name, Last Name)
8.2. The system must validate email format for parent email field
8.3. The system must validate date format for date of birth
8.4. The system must display appropriate error messages for invalid inputs

## Non-Goals (Out of Scope)

1. **Client Profile Management**: Detailed client profile editing is not included in this feature
2. **Bulk Operations**: Bulk import, export, or editing of clients is not included
3. **Advanced Filtering**: Complex filtering by date ranges, staff assignments, or other criteria is not included
4. **Client History**: Audit trails or change history for client records is not included
5. **File Attachments**: Uploading or managing client documents is not included
6. **Communication Features**: Direct messaging or communication tools are not included

## Design Considerations

### Visual Design
- Follow the exact layout and styling shown in the provided design images
- Use red (#FC5858) as the primary color for buttons and active tab states
- Use orange (#FCA311) for pagination active states
- Use beige (#F4EDE2) as the table background color
- Implement clean, modern UI with appropriate rounded corners (left-only for table cards)
- Use pill-shaped search input with transparent background
- Use color-coded badges for status indicators (red, yellow, gray)
- Ensure proper contrast and readability
- Implement card-based table design with proper spacing

### Responsive Design
- The interface must be fully responsive and work on mobile, tablet, and desktop
- Header elements must stack vertically on mobile (below 1024px) and arrange horizontally on larger screens
- Search and Add Client button must stack vertically on mobile (below 640px)
- Table must implement horizontal scrolling rather than responsive breakdowns for mobile devices
- Table must maintain fixed column widths and use horizontal scroll to prevent content overflow
- Pagination must be touch-friendly with minimum 44px touch targets on mobile devices
- Modal should be properly sized for different screen sizes
- Font sizes must be responsive: smaller on mobile, larger on desktop
- Padding and spacing must be responsive: reduced on mobile, standard on desktop

### Component Reuse
- Leverage existing UI components from the project (Button, Input, Modal, Table, etc.)
- Follow established design patterns and component library
- Use existing form validation patterns and error handling

## Technical Considerations

### Integration Points
**✅ IMPLEMENTED**: Full backend integration completed with the following architecture:

- **APSO Backend Integration**: Complete CRUD system auto-generated via APSO scaffolding
- **Database Schema**: Client entity with many-to-many relationship to User (staff) entity
- **API Endpoints**: RESTful endpoints at `/Clients` with filtering, pagination, and search
- **CORS Configuration**: Properly configured for frontend-backend communication
- Integrate with existing authentication system (Clerk)
- Connect to existing staff management system for therapist assignments
- Use existing API patterns and error handling
- Follow established state management patterns

### Performance Requirements
- Implement debounced search to optimize performance
- Use pagination to handle large datasets efficiently
- Ensure fast loading times for the initial page load
- Optimize modal rendering and form interactions

### Data Management
**✅ IMPLEMENTED**: Complete data management with real backend persistence:

- **✅ Database Integration**: Client data persisted in PostgreSQL via APSO-generated entity
- **✅ Real-time State Management**: useClients hook with proper React state management
- **✅ Immediate UI Updates**: New clients instantly appear in table after creation
- **✅ Comprehensive Error Handling**: API errors properly caught and displayed to users
- **✅ Loading States**: Loading indicators during API calls
- **✅ Case-Insensitive Search**: Backend search using `$contL` operator for optimal UX
- **✅ Date Format Conversion**: Automatic DD/MM/YYYY to YYYY-MM-DD conversion for API
- **✅ Server-side Filtering**: Status filters and search handled by backend API
- **✅ Pagination Management**: Server-side pagination with proper page state management
- Support dynamic filtering based on user authentication and staff assignments
- Implement robust date formatting to handle multiple input formats (DD/MM/YYYY, MM/DD/YYYY, ISO format) and consistently display dates as "Month Day, Year" (e.g., "March 15, 2020")
- Implement proper text truncation and whitespace handling to prevent layout overflow
- Ensure all table content remains within designated column widths using CSS Grid with fixed dimensions

## Implementation Summary

### ✅ Backend Implementation (APSO Integration)

**APSO Schema Created**: Complete Client entity with proper field types and relationships
```json
{
  "name": "Client",
  "fields": [
    {"name": "firstName", "type": "text", "nullable": false},
    {"name": "lastName", "type": "text", "nullable": false}, 
    {"name": "dateOfBirth", "type": "date", "nullable": true},
    {"name": "parentEmail", "type": "text", "is_email": true, "nullable": true},
    {"name": "thingsToLookOutFor", "type": "text", "nullable": true},
    {"name": "status", "type": "enum", "values": ["Current", "Waitlisted", "Archived"], "default": "Current"}
  ]
}
```

**Generated API Endpoints**:
- `GET /Clients` - List clients with pagination, filtering, and search
- `POST /Clients` - Create new client
- `GET /Clients/{id}` - Get single client
- `PATCH /Clients/{id}` - Update client
- `DELETE /Clients/{id}` - Delete client

**Relationships**: Many-to-many relationship between Client and User (staff) entities for associated staff functionality.

### ✅ Frontend Implementation

**API Integration**: Complete `BackendApiClient` with all Client CRUD operations
**Custom Hook**: `useClients` hook for state management and API interactions  
**Components**: Updated all client components to use real backend data
**Search Enhancement**: Case-insensitive search using `$contL` operator
**Form Enhancement**: Added "Things to Look Out For" field to Add Client modal
**Error Handling**: Comprehensive error states and loading indicators
**CORS Fix**: Configured backend CORS for proper frontend-backend communication

### ✅ Issues Resolved

1. **CORS Configuration**: Added proper CORS headers to allow frontend access to backend
2. **Search Case Sensitivity**: Changed from `cont` to `$contL` for case-insensitive search  
3. **Date Format Handling**: Automatic conversion from DD/MM/YYYY to YYYY-MM-DD for API
4. **Real-time Updates**: Immediate table refresh after client creation
5. **Missing Form Field**: Added "Things to Look Out For" field to match backend schema

## Success Metrics

1. **User Adoption**: 90% of staff members use the Clients page within the first week of deployment
2. **Task Completion**: Users can successfully add a new client in under 2 minutes
3. **Search Efficiency**: Users can find a specific client within 3 search attempts
4. **Performance**: Page load time under 2 seconds on average
5. **Accessibility**: 100% compliance with WCAG 2.1 AA standards
6. **Error Rate**: Less than 5% of form submissions result in errors

## Open Questions

~~**All major technical questions resolved through implementation:**~~

1. ~~**Data Source**: What is the exact database schema for client records?~~ **✅ RESOLVED**: APSO-generated PostgreSQL schema with proper entity relationships
2. ~~**Staff Assignment**: How is the relationship between clients and staff members defined in the database?~~ **✅ RESOLVED**: Many-to-many relationship between Client and User entities  
3. **Status Transitions**: Are there any business rules for how clients move between statuses? *(No specific rules implemented - manual status updates allowed)*
4. **Permission Model**: What specific permissions do different user roles have for client management? *(Currently using Clerk authentication - all authenticated users can manage clients)*
5. **Integration Requirements**: Are there any external systems that need to be notified when clients are added or updated? *(No external integrations implemented)*
6. **Data Validation**: Are there any specific business rules for client data validation beyond basic format checking? *(Basic validation only - first/last name required, email format validation)*
7. **Performance Thresholds**: What is the expected maximum number of clients in the system? *(Server-side pagination implemented to handle large datasets)*
8. **Mobile Priority**: Should the mobile experience be prioritized over desktop for this feature? *(Responsive design implemented for both mobile and desktop)*

### Remaining Open Items
- Advanced permission model based on user roles
- Audit trail for client changes  
- Advanced filtering capabilities
- Client status transition workflows
- External system integrations 