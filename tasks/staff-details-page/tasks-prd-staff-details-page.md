# Task List: Staff Details Page Implementation

Based on the PRD: `prd-staff-details-page.md`

## Relevant Files

- `backend/.apsorc` - Backend entity definitions (needs new entities for staff details)
- `web/src/app/staff/[id]/page.tsx` - Main staff details page component
- `web/src/components/staff/StaffDetailsPage.tsx` - Main staff details page component
- `web/src/components/staff/sections/StaffProfileSection.tsx` - Staff profile section component
- `web/src/components/staff/sections/HoursSection.tsx` - Hours management section component
- `web/src/components/staff/sections/ClinicInformationSection.tsx` - Clinic information section component
- `web/src/components/staff/sections/SpecialConditionsSection.tsx` - Special conditions section component
- `web/src/components/staff/sections/EmergencyContactSection.tsx` - Emergency contact section component
- `web/src/components/staff/sections/CredentialsSection.tsx` - Credentials section component
- `web/src/components/staff/sections/InternalNotesSection.tsx` - Internal notes section component
- `web/src/components/staff/modals/EditStaffProfileModal.tsx` - Modal for editing staff profile
- `web/src/components/staff/modals/EditHoursModal.tsx` - Modal for editing hours
- `web/src/components/staff/modals/EditClinicInfoModal.tsx` - Modal for editing clinic information
- `web/src/components/staff/modals/EditSpecialConditionsModal.tsx` - Modal for editing special conditions
- `web/src/components/staff/modals/EditEmergencyContactModal.tsx` - Modal for editing emergency contact
- `web/src/components/staff/modals/EditCredentialsModal.tsx` - Modal for editing credentials
- `web/src/components/staff/modals/EditNotesModal.tsx` - Modal for editing internal notes
- `web/src/components/staff/modals/SignatureModal.tsx` - Modal for digital signature capture
- `web/src/hooks/useStaffDetails.ts` - Custom hook for staff details data management
- `web/src/hooks/useStaffHours.ts` - Custom hook for staff hours data management
- `web/src/hooks/useClinicInformation.ts` - Custom hook for clinic information data management
- `web/src/hooks/useSpecialConditions.ts` - Custom hook for special conditions data management
- `web/src/hooks/useCredentials.ts` - Custom hook for credentials data management
- `web/src/hooks/useEmergencyContacts.ts` - Custom hook for emergency contacts data management
- `web/src/lib/types/staff-details.ts` - TypeScript interfaces for staff details data
- `web/src/lib/types/staff-hours.ts` - TypeScript interfaces for staff hours data
- `web/src/lib/types/clinic-information.ts` - TypeScript interfaces for clinic information data
- `web/src/lib/types/special-conditions.ts` - TypeScript interfaces for special conditions data
- `web/src/lib/types/credentials.ts` - TypeScript interfaces for credentials data
- `web/src/lib/types/emergency-contacts.ts` - TypeScript interfaces for emergency contacts data - `web/src/app/api/staffHours/route.ts` - API route for staff hours CRUD operations - `web/src/app/api/ClinicInformations/route.ts` - API route for clinic information CRUD operations - `web/src/app/api/SpecialConditions/route.ts` - API route for special conditions CRUD operations - `web/src/app/api/Credentials/route.ts` - API route for credentials CRUD operations - `web/src/app/api/EmergencyContacts/route.ts` - API route for emergency contacts CRUD operations
- `web/src/components/staff/StaffTable.tsx` - Existing staff table (needs row click navigation)
- `web/src/components/staff/StaffTableNew.tsx` - Existing staff table (needs row click navigation)

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `StaffDetailsPage.tsx` and `StaffDetailsPage.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- The existing staff listing page and components can be leveraged for navigation and data fetching patterns.
- The existing `useStaff` hook provides a foundation for data management patterns.
- The existing User entity in `.apsorc` already contains most staff profile fields, including the signature field, but needs additional fields for complete staff details.

## Tasks

- [x] 1.0 Backend Entity Setup and API Scaffolding

  - [x] 1.1 Update `.apsorc` file with new entities for staff details
  - [x] 1.2 Add StaffHours entity with fields: ExpectedHours, maxHours, maxOvertimeHours, supervisedHours, vacationTimeAlloted, SickTimeAlloted
  - [x] 1.3 Add ClinicInformation entity with fields: Title, EmployeeNumber, NPINumber, Department, Supervisor, DateHired, DateTerminated
  - [x] 1.4 Add SpecialConditions entity with text field and many-to-many relationship with staff
  - [x] 1.5 Add Credentials entity with fields: CredentialName (enum), IssueDate, ExpireDate, Note
  - [x] 1.6 Add EmergencyContact entity with fields: Name, Relationship, Phone, Email, Address
  - [x] 1.7 Add missing fields to User entity: DateOfBirth, Gender, WorkPhone, HomePhone, SocialSecurityNumber (signature field already exists)
  - [x] 1.8 Run `apso server scaffold` to generate CRUD APIs for all new entities
  - [x] 1.9 Verify all API endpoints are working correctly
  - [x] 1.10 Test entity relationships and foreign key constraints

- [x] 2.0 Frontend Routing and Page Structure

  - [x] 2.1 Create Next.js dynamic route structure for `/staff/[id]`
  - [x] 2.2 Create main staff details page component (`web/src/app/staff/[id]/page.tsx`)
  - [x] 2.3 Implement loading states and error handling for the page
  - [x] 2.4 Set up proper TypeScript types for the page props and params
  - [x] 2.5 Create responsive layout structure with proper spacing and sections
  - [x] 2.6 Implement breadcrumb navigation from staff listing to details
  - [x] 2.7 Add proper meta tags and SEO optimization for staff details pages
  - [x] 2.8 Test routing with valid and invalid staff IDs

- [x] 3.0 Staff Details Data Management and API Integration

  - [x] 3.1 Create TypeScript interfaces for all new entities (`staff-hours.ts`, `clinic-information.ts`, etc.)
  - [x] 3.2 Create `useStaffDetails` hook for managing staff profile data
  - [x] 3.3 Create `useStaffHours` hook for managing staff hours data
  - [x] 3.4 Create `useClinicInformation` hook for managing clinic information data
  - [x] 3.5 Create `useSpecialConditions` hook for managing special conditions data
  - [x] 3.6 Create `useCredentials` hook for managing credentials data
  - [x] 3.7 Create `useEmergencyContacts` hook for managing emergency contact data
  - [x] 3.8 Create API route handlers for all new entities (`/api/staff-hours`, `/api/clinic-information`, etc.)
  - [x] 3.9 Implement proper error handling and loading states in all hooks
  - [x] 3.10 Add data validation and transformation logic for API responses
  - [x] 3.11 Implement proper caching and data synchronization between hooks

- [x] 4.0 Staff Details Page UI Components and Sections

  - [x] 4.1 Create `StaffDetailsPage` main component with responsive layout
  - [x] 4.2 Create `StaffProfileSection` component displaying all profile fields
  - [x] 4.3 Create `HoursSection` component with structured hours display
  - [x] 4.4 Create `ClinicInformationSection` component for clinic details
  - [x] 4.5 Create `SpecialConditionsSection` component with list display
  - [x] 4.6 Create `EmergencyContactSection` component for emergency contacts
  - [x] 4.7 Create `CredentialsSection` component with credential cards
  - [x] 4.8 Create `InternalNotesSection` component for internal notes
  - [x] 4.9 Implement empty states for all sections when no data is available
  - [x] 4.10 Add proper loading skeletons for all sections
  - [x] 4.11 Implement responsive design with section wrapping for mobile
  - [x] 4.12 Add proper accessibility features (ARIA labels, keyboard navigation)
  - [x] 4.13 Style all components to match Figma designs and existing design system

- [x] 5.0 Edit Functionality and Modal Components (Updated with Figma Designs)

  - [x] 5.1 Update `EditStaffProfileModal` to match exact Figma design with simplified fields

    - Only include: First Name*, Last Name*, Date of Birth, Social Security Number, Gender, Work Phone, Home Phone, Mobile Phone, Home Address
    - Use Figma-specified styling and layout
    - Implement proper validation with red asterisks for required fields

  - [x] 5.2 Update `EditHoursModal` to match exact Figma design

    - Based on Figma specifications: @https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8637&m=dev

  - [x] 5.3 Update `EditClinicInformationModal` to match exact Figma design

    - Include: Title, Employee Number, NPI Number, Supervisor (dropdown), Date Hired, Date Terminated
    - Based on Figma specifications: @https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8621&m=dev

  - [x] 5.4 Create `EditEmergencyContactModal` to match exact Figma design

    - Include: First Name*, Last Name*, Relationship, Phone, Email
    - Based on Figma specifications: @https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8375&m=dev

  - [x] 5.5 Create `EditSpecialConditionsModal` to match exact Figma design

    - Based on Figma specifications: @https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8390&m=dev

  - [x] 5.6 Implement Add/Edit button logic based on data availability

    - Show "Add" button when no data exists for a section
    - Show "Edit" button when data exists for a section
    - Dynamic button text and functionality

  - [x] 5.7 Integrate all modals with appropriate backend endpoints

    - POST for creating new records (Add functionality)
    - PUT for updating existing records (Edit functionality)
    - Proper error handling and success feedback

  - [x] 5.8 Update sections to show 'Add' vs 'Edit' buttons dynamically

    - Check data availability in each section
    - Update button text and modal behavior accordingly

  - [x] 5.9 Implement proper form validation for all modals

    - Zod schemas for each modal
    - Client-side validation with proper error messages
    - Required field indicators (red asterisks)

  - [x] 5.10 Add proper error handling and success feedback
    - Loading states during API calls
    - Success notifications
    - Error message display

- [x] 5.11 Implement Digital Signature Feature

  - [x] 5.11.1 Install `react-signature-canvas` package for signature capture
  - [x] 5.11.2 Create `SignatureModal` component with canvas-based signature capture
  - [x] 5.11.3 Implement signature capture functionality with mouse and touch support
  - [x] 5.11.4 Add clear, save, and cancel functionality to signature modal
  - [x] 5.11.5 Integrate signature modal into `StaffProfileSection` component
  - [x] 5.11.6 Implement dynamic "Add Signature" vs "View Signature" button logic
  - [x] 5.11.7 Add signature preview functionality for existing signatures
  - [x] 5.11.8 Implement signature storage as base64 encoded image data
  - [x] 5.11.9 Update staff profile types to include signature field
  - [x] 5.11.10 Update validation schemas to handle signature field
  - [x] 5.11.11 Verify signature field integration with existing User entity
  - [x] 5.11.12 Test signature capture on both desktop and mobile devices
  - [x] 5.11.13 Ensure signature data persists after page refresh
  - [x] 5.11.14 Implement proper error handling for signature operations

- [x] 5.12 Implement Internal Notes with File Upload Feature

  - [x] 5.12.1 Install Cloudinary package for file uploads
  - [x] 5.12.2 Create Cloudinary configuration and helper functions
  - [x] 5.12.3 Update Notes types to include file attachments
  - [x] 5.12.4 Create enhanced useNotes hook with file upload support
  - [x] 5.12.5 Implement InternalNotesSection component with inline form
  - [x] 5.12.6 Add file upload functionality with preview
  - [x] 5.12.7 Implement file deletion from Cloudinary
  - [x] 5.12.8 Add file type icons and size formatting
  - [x] 5.12.9 Create Cloudinary setup documentation
  - [x] 5.12.10 Test file upload and download functionality

- [x] 5.13 Implement Staff Status Change Feature

  - [x] 5.13.1 Add status change functionality to StaffDetailsPage
  - [x] 5.13.2 Implement radio buttons for Current/Archived status
  - [x] 5.13.3 Map frontend status (Current/Archived) to backend status (Active/Inactive)
  - [x] 5.13.4 Add loading state during status updates
  - [x] 5.13.5 Implement API call to update user status
  - [x] 5.13.6 Add visual feedback for status changes
  - [x] 5.13.7 Ensure status updates refresh the page data

- [x] 6.0 Navigation Integration and Testing
  - [x] 6.1 Update existing `StaffTable` component to handle row clicks
  - [x] 6.2 Update existing `StaffTableNew` component to handle row clicks
  - [x] 6.3 Implement navigation from staff listing to details page
  - [x] 6.4 Add proper hover states and cursor indicators for clickable rows
  - [x] 6.5 Test navigation flow from staff listing to details and back
  - [x] 6.6 Write unit tests for all new components and hooks
  - [x] 6.7 Write integration tests for the complete staff details flow
  - [x] 6.8 Test responsive behavior on different screen sizes
  - [x] 6.9 Test accessibility features with screen readers
  - [x] 6.10 Test error handling and edge cases
  - [x] 6.11 Perform end-to-end testing of the complete feature
  - [x] 6.12 Update documentation and README files
