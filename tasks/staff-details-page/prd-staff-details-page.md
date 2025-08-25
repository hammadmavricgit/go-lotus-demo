# Product Requirements Document: Staff Details Page

## Introduction/Overview

The Staff Details Page is a comprehensive profile view that displays detailed information about individual staff members. When users click on a row from the staff listing table, they will be navigated to a dedicated page showing all staff-related information organized into logical sections. This feature provides administrators and staff members with a complete view of staff profiles, including personal information, work schedules, credentials, and internal notes.

**Problem Statement:** Currently, staff information is scattered across different systems and there's no centralized location to view comprehensive staff profiles with all related data.

**Goal:** Create a unified, detailed staff profile page that consolidates all staff-related information into an organized, accessible interface.

## Goals

1. **Centralized Staff Information:** Provide a single location to view all staff-related data
2. **Improved Data Accessibility:** Enable authenticated users to quickly access comprehensive staff profiles
3. **Enhanced User Experience:** Create an intuitive, organized interface for viewing staff details
4. **Data Completeness:** Display all staff information including empty states for missing data
5. **Responsive Design:** Ensure the page works seamlessly across desktop, tablet, and mobile devices
6. **Admin Functionality:** Allow administrators to edit all sections of staff information

## User Stories

1. **As an administrator**, I want to view comprehensive staff profiles so that I can access all staff-related information in one place.

2. **As an administrator**, I want to edit staff information through organized sections so that I can efficiently update staff data.

3. **As a staff member**, I want to view my own profile details so that I can verify my information is accurate and up-to-date.

4. **As an authenticated user**, I want to navigate to staff details from the staff listing table so that I can quickly access specific staff information.

5. **As a user**, I want to see clear empty states when data is missing so that I understand what information is available vs. not yet provided.

6. **As a user**, I want the page to be responsive so that I can access staff details on any device.

## Functional Requirements

### 1. Navigation & Routing

1. The system must implement direct URL routing using the pattern `/staff/[id]`
2. The system must allow navigation to staff details by clicking on any row in the staff listing table
3. The system must display a loading state while fetching staff data
4. The system must handle invalid staff IDs with appropriate error messaging

### 2. Access Control

5. The system must allow all authenticated users to view staff details pages
6. The system must allow administrators to edit all sections of staff information
7. The system must display appropriate edit buttons/controls for admin users only

### 3. Staff Profile Section

8. The system must display the following staff profile fields:
   - First Name
   - Last Name
   - Clerk ID
   - Date of Birth
   - Gender
   - Work Phone
   - Home Phone
   - Primary Phone
   - Social Security Number
   - Address Line 1
   - Address Line 2
   - Digital Signature
9. The system must allow administrators to edit staff profile information
10. The system must validate all input fields according to data type requirements
11. The system must support digital signature capture and storage
12. The system must allow users to add, view, and update their digital signature
13. The system must store signatures as base64 encoded image data
14. The system must provide a canvas-based signature capture interface
15. The system must support both mouse and touch input for signature capture

### 4. Hours Management Section

11. The system must display staff hours information including:

- Expected Hours
- Maximum Hours
- Maximum Overtime Hours
- Supervised Hours
- Vacation Time Allotted
- Sick Time Allotted

12. The system must show hours data in a structured format matching the Figma design
13. The system must allow administrators to edit hours information
14. The system must display empty states when hours data is not available

### 5. Clinic Information Section

15. The system must display clinic information including:

- Title
- Employee Number
- NPI Number
- Department
- Supervisor
- Date Hired
- Date Terminated

16. The system must allow administrators to edit clinic information
17. The system must display empty states when clinic information is not available

### 6. Special Conditions Section

18. The system must display a list of special conditions for each staff member
19. The system must allow administrators to add, edit, and remove special conditions
20. The system must store special conditions as text fields in the backend
21. The system must support multiple special conditions per staff member
22. The system must display empty states when no special conditions are defined

### 7. Emergency Contact Information Section

23. The system must display emergency contact information for staff members
24. The system must support multiple emergency contacts per staff member
25. The system must allow administrators to add, edit, and remove emergency contact information
26. The system must display empty states when no emergency contact information is available

### 8. Credentials Section

26. The system must display staff credentials including:

- Credential Name (enum: CPR Training, Medical Training, Physiotherapy)
- Issue Date
- Expire Date
- Notes

27. The system must allow administrators to add, edit, and remove credentials
28. The system must support multiple credentials per staff member
29. The system must display empty states when no credentials are available

### 9. Internal Notes Section

30. The system must display internal notes about staff members
31. The system must allow all staff members to view internal notes
32. The system must allow administrators to add, edit, and remove internal notes
33. The system must display empty states when no internal notes are available

### 10. User Interface Requirements

34. The system must implement responsive design that works on desktop, tablet, and mobile devices
35. The system must organize information into clear, distinct sections as specified
36. The system must display "No data available" messages for empty sections
37. The system must provide clear visual hierarchy and spacing between sections
38. The system must implement consistent styling matching the existing design system

### 11. Data Management

39. The system must fetch staff data from the backend API
40. The system must handle data loading states appropriately
41. The system must implement manual refresh functionality (no real-time updates required)
42. The system must validate all form inputs before submission
43. The system must provide appropriate error handling and user feedback

## Non-Goals (Out of Scope)

1. **Real-time Updates:** The system will not implement live updates or WebSocket connections
2. **Advanced Notifications:** The system will not include credential expiration alerts or schedule change notifications
3. **External Integrations:** The system will not integrate with time tracking, HR, payroll, or scheduling systems
4. **Mobile App:** The system will not include progressive web app features or native mobile functionality
5. **Advanced Search:** The system will not include search functionality within the details page
6. **Bulk Operations:** The system will not support bulk editing of multiple staff members
7. **Audit Trail:** The system will not track changes or provide version history of staff information

## Design Considerations

### Figma Design References

- **Main Staff Details Screen:** [Staff Profile Details Screen](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8488&m=dev)
- **Clinic Information Modal:** [Clinic Information Modal](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8621&m=dev)
- **Hours Management Modal:** [Hours Management Modal](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8637&m=dev)
- **Staff Profile Modal:** [Staff Profile Modal](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8602&m=dev)
- **Emergency Contact Modal:** [Emergency Contact Modal](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8375&m=dev)
- **Hours Display:** [Hours Section](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=889-12535&m=dev)
- **Clinic Information Display:** [Clinic Information Section](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=889-12494&m=dev)
- **Special Conditions:** [Special Conditions Section](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8539&m=dev)
- **Credentials:** [Credentials Section](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=889-12809&m=dev)
- **Digital Signature:** [Signature Capture Interface](https://www.figma.com/design/mZ7kd5MfCuNd2os7NRGNjS/Lotus--Copy-?node-id=812-8433&m=dev)

### UI/UX Requirements

- Follow the existing design system using ShadCn components and Tailwind CSS
- Implement responsive design with section wrapping for mobile devices
- Use consistent spacing, typography, and color schemes
- Provide clear visual feedback for interactive elements
- Implement proper loading states and error handling

## Technical Considerations

### Backend Requirements

1. **New Entities Required:**

   - staffHour (ExpectedHours, maxHours, maxOvertimeHours, supervisedHours, vacationTimeAlloted, SickTimeAlloted)
   - ClinicInformation (Title, EmployeeNumber, NPINumber, Department, Supervisor, DateHired, DateTerminated)
   - SpecialConditions (text field, many-to-many relationship with staff)
   - Credentials (CredentialName enum, IssueDate, ExpireDate, Note)
   - EmergencyContact (Name, Relationship, Phone, Email, Address)

2. **Existing Entities:**

   - Staff Profile (already exists in backend, includes signature field)
   - Internal Notes (already exists in backend)

3. **API Endpoints Required:**

   **Staff Profile (Users Entity):**

   - GET `/api/users/[id]` - Fetch staff profile details
   - PUT `/api/users/[id]` - Update staff profile

   **Staff Hours (staffHour Entity):**

   - GET `/api/staffHours` - Fetch all staff hours (with filters)
   - GET `/api/staffHours/[id]` - Fetch specific staff hours record
   - POST `/api/staffHours` - Create new staff hours record
   - PUT `/api/staffHours/[id]` - Update staff hours record
   - DELETE `/api/staffHours/[id]` - Delete staff hours record

   **Clinic Information (ClinicInformation Entity):**

   - GET `/api/ClinicInformations` - Fetch all clinic information (with filters)
   - GET `/api/ClinicInformations/[id]` - Fetch specific clinic information record
   - POST `/api/ClinicInformations` - Create new clinic information record
   - PUT `/api/ClinicInformations/[id]` - Update clinic information record
   - DELETE `/api/ClinicInformations/[id]` - Delete clinic information record

   **Special Conditions (SpecialConditions Entity):**

   - GET `/api/SpecialConditions` - Fetch all special conditions (with filters)
   - GET `/api/SpecialConditions/[id]` - Fetch specific special condition record
   - POST `/api/SpecialConditions` - Create new special condition record
   - PUT `/api/SpecialConditions/[id]` - Update special condition record
   - DELETE `/api/SpecialConditions/[id]` - Delete special condition record

   **Credentials (Credentials Entity):**

   - GET `/api/Credentials` - Fetch all credentials (with filters)
   - GET `/api/Credentials/[id]` - Fetch specific credential record
   - POST `/api/Credentials` - Create new credential record
   - PUT `/api/Credentials/[id]` - Update credential record
   - DELETE `/api/Credentials/[id]` - Delete credential record

   **Internal Notes (Notes Entity):**

   - GET `/api/notes` - Fetch all notes (with filters)
   - GET `/api/notes/[id]` - Fetch specific note record
   - POST `/api/notes` - Create new note record
   - PUT `/api/notes/[id]` - Update note record
   - DELETE `/api/notes/[id]` - Delete note record

   **Emergency Contact (EmergencyContact Entity):**

   - GET `/api/EmergencyContacts` - Fetch all emergency contacts (with filters)
   - GET `/api/EmergencyContacts/[id]` - Fetch specific emergency contact record
   - POST `/api/EmergencyContacts` - Create new emergency contact record
   - PUT `/api/EmergencyContacts/[id]` - Update emergency contact record
   - DELETE `/api/EmergencyContacts/[id]` - Delete emergency contact record

### Frontend Requirements

1. **Components Required:**

   - StaffDetailsPage (main page component)
   - StaffProfileSection
   - HoursSection
   - ClinicInformationSection
   - SpecialConditionsSection
   - EmergencyContactSection
   - CredentialsSection
   - InternalNotesSection
   - SignatureModal (digital signature capture component)
   - EditModal components for each section

2. **Routing:**

   - Implement Next.js dynamic routing for `/staff/[id]`
   - Handle loading and error states

3. **State Management:**
   - Use React hooks for local state management
   - Implement proper data fetching and caching

## Success Metrics

1. **User Adoption:** 90% of authenticated users access staff details within the first week of launch
2. **Data Completeness:** 80% of staff profiles have complete information within 30 days
3. **User Satisfaction:** Average user rating of 4.5/5 for the staff details page
4. **Performance:** Page load time under 2 seconds on average
5. **Mobile Usage:** 40% of staff details page views come from mobile devices
6. **Admin Efficiency:** 50% reduction in time spent looking up staff information

## Open Questions

1. **Data Validation:** What are the specific validation rules for each field (e.g., phone number formats, SSN masking)?
2. **File Uploads:** Should the system support profile photo uploads or document attachments?
3. **Export Functionality:** Should administrators be able to export staff details to PDF or other formats?
4. **Audit Requirements:** Are there any compliance requirements for tracking changes to sensitive information?
5. **Bulk Import:** Should the system support bulk import of staff data from external sources?
6. **Advanced Filtering:** Should the credentials section support filtering by expiration date or credential type?
7. **Integration Future:** Are there plans to integrate with external HR or scheduling systems in the future?
8. **Multi-language Support:** Should the system support multiple languages for international staff members?
