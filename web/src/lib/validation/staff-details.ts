import { z } from 'zod';
import { Staff, StaffStatus } from '@/lib/types/staff';

// Staff Profile Validation Schema
export const staffProfileSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['Current', 'Archived']),
  role: z.string(),
  primaryPhone: z.string().nullable(),
  signature: z.string().nullable(),
  title: z.string().nullable(),
  bio: z.string().nullable(),
  address1: z.string().nullable(),
  address2: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zipCode: z.number().nullable(),
  dateOfBirth: z.string().nullable(),
  gender: z.string().nullable(),
  workPhone: z.string().nullable(),
  homePhone: z.string().nullable(),
  socialSecurityNumber: z.string().nullable(),
});

// Staff Hours Validation Schema
export const staffHoursSchema = z.object({
  id: z.number(),
  expectedHours: z.number().nullable(),
  maxHours: z.number().nullable(),
  maxOvertimeHours: z.number().nullable(),
  supervisedHours: z.number().nullable(),
  vacationTimeAlloted: z.number().nullable(),
  sickTimeAlloted: z.number().nullable(),
  userId: z.number().optional().default(0), // Optional since backend doesn't return it
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Clinic Information Validation Schema
export const clinicInformationSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  employeeNumber: z.string().nullable(),
  npiNumber: z.string().nullable(),
  department: z.string().nullable(),
  supervisor: z.string().nullable(),
  dateHired: z.string().nullable(),
  dateTerminated: z.string().nullable(),
  userId: z.number().optional().default(0), // Optional since backend doesn't return it
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Special Condition Validation Schema
export const specialConditionSchema = z.object({
  id: z.number(),
  condition: z.string().min(1, 'Condition is required'),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Staff Special Condition Validation Schema
export const staffSpecialConditionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  specialConditionId: z.number(),
  specialCondition: specialConditionSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Credential Validation Schema
export const credentialSchema = z.object({
  id: z.number(),
  credentialName: z.enum(['CPR_TRAINING', 'MEDICAL_TRAINING', 'PHYSIOTHERAPY']),
  issueDate: z.string().nullable(),
  expireDate: z.string().nullable(),
  note: z.string().nullable(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Emergency Contact Validation Schema
export const emergencyContactSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.union([z.string().email('Invalid email address'), z.null()]),
  address: z.string().nullable(),
  userId: z.number().optional().default(0), // Optional since backend doesn't return it
  createdAt: z.string(),
  updatedAt: z.string(),
});

// File Attachment Validation Schema
export const fileAttachmentSchema = z.object({
  id: z.string(),
  url: z.string(),
  publicId: z.string(),
  fileName: z.string(),
  fileSize: z.number(),
  mimeType: z.string(),
  uploadedAt: z.string(),
});

// Notes Validation Schema
export const notesSchema = z.object({
  id: z.number(),
  issueDate: z.union([z.string(), z.null()]),
  label: z.union([z.string(), z.null()]),
  note: z.union([z.string(), z.null()]),
  fileUrl: z.union([z.string(), z.null()]),
  attachments: z.union([z.array(fileAttachmentSchema), z.null()]),
  userId: z.union([z.number(), z.null()]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Validation functions
export function validateStaffProfile(data: unknown) {
  return staffProfileSchema.safeParse(data);
}

export function validateStaffHours(data: unknown) {
  return staffHoursSchema.safeParse(data);
}

export function validateClinicInformation(data: unknown) {
  return clinicInformationSchema.safeParse(data);
}

export function validateSpecialConditions(data: unknown) {
  return z.array(staffSpecialConditionSchema).safeParse(data);
}

export function validateCredentials(data: unknown) {
  return z.array(credentialSchema).safeParse(data);
}

export function validateEmergencyContact(data: unknown) {
  return emergencyContactSchema.safeParse(data);
}

export function validateEmergencyContacts(data: unknown) {
  return z.array(emergencyContactSchema).safeParse(data);
}

export function validateNotes(data: unknown) {
  return z.array(notesSchema).safeParse(data);
}

// Data transformation utilities
export function transformBackendUserToStaff(userData: any): Staff {
  return {
    id: userData.id,
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    status: (userData.status === 'Active' ? 'Current' : 'Archived') as StaffStatus,
    role: userData.role || 'staff',
    primaryPhone: userData.primary_phone || null,
    signature: userData.signature || null,
    title: userData.title || null,
    bio: userData.bio || null,
    address1: userData.address1 || null,
    address2: userData.address2 || null,
    city: userData.city || null,
    state: userData.state || null,
    zipCode: userData.zip_code || null,
    dateOfBirth: userData.date_of_birth || null,
    gender: userData.gender || null,
    workPhone: userData.work_phone || null,
    homePhone: userData.home_phone || null,
    socialSecurityNumber: userData.social_security_number || null,
  };
}

export function transformBackendHoursToStaffHours(hoursData: any) {
  return {
    id: hoursData.id,
    expectedHours: hoursData.expectedHours,
    maxHours: hoursData.maxHours,
    maxOvertimeHours: hoursData.maxOvertimeHours,
    supervisedHours: hoursData.supervisedHours,
    vacationTimeAlloted: hoursData.vacationTimeAlloted,
    sickTimeAlloted: hoursData.sickTimeAlloted,
    userId: hoursData.userId || 0, // Default since this isn't returned from backend
    createdAt: hoursData.created_at || hoursData.createdAt,
    updatedAt: hoursData.updated_at || hoursData.updatedAt,
  };
}

export function transformBackendClinicInfoToClinicInfo(clinicData: any) {
  return {
    id: clinicData.id,
    title: clinicData.title,
    employeeNumber: clinicData.employeeNumber,
    npiNumber: clinicData.npiNumber,
    department: clinicData.department,
    supervisor: clinicData.supervisor,
    dateHired: clinicData.dateHired,
    dateTerminated: clinicData.dateTerminated,
    userId: clinicData.userId || 0, // Default since this isn't returned from backend
    createdAt: clinicData.created_at || clinicData.createdAt,
    updatedAt: clinicData.updated_at || clinicData.updatedAt,
  };
}

export function transformBackendSpecialConditionsToSpecialConditions(
  conditionsData: any[]
) {
  return conditionsData.map((condition) => ({
    id: condition.id,
    userId: condition.userId,
    specialConditionId: condition.specialConditionId,
    specialCondition: {
      id: condition.specialCondition.id,
      condition: condition.specialCondition.condition,
      createdAt: condition.specialCondition.createdAt,
      updatedAt: condition.specialCondition.updatedAt,
    },
    createdAt: condition.createdAt,
    updatedAt: condition.updatedAt,
  }));
}

export function transformBackendCredentialsToCredentials(
  credentialsData: any[]
) {
  return credentialsData.map((credential) => {
    const createdAt = credential.created_at || credential.createdAt;
    const updatedAt = credential.updated_at || credential.updatedAt;

    return {
      id: credential.id,
      credentialName: credential.credentialName,
      issueDate: credential.issueDate,
      expireDate: credential.expireDate,
      note: credential.note,
      userId: credential.userId || 0, // Default since this might not be returned from backend
      createdAt:
        createdAt instanceof Date ? createdAt.toISOString() : String(createdAt),
      updatedAt:
        updatedAt instanceof Date ? updatedAt.toISOString() : String(updatedAt),
    };
  });
}

export function transformBackendEmergencyContactToEmergencyContact(
  contactData: any
) {
  const createdAt = contactData.created_at || contactData.createdAt;
  const updatedAt = contactData.updated_at || contactData.updatedAt;

  return {
    id: contactData.id,
    name: contactData.name,
    relationship: contactData.relationship,
    phone: contactData.phone,
    email: contactData.email,
    address: contactData.address,
    userId: contactData.userId || 0, // Default since this isn't returned from backend
    createdAt:
      createdAt instanceof Date ? createdAt.toISOString() : String(createdAt),
    updatedAt:
      updatedAt instanceof Date ? updatedAt.toISOString() : String(updatedAt),
  };
}

export function transformBackendEmergencyContactsToEmergencyContacts(
  contactsData: any[]
) {
  return contactsData.map((contact) =>
    transformBackendEmergencyContactToEmergencyContact(contact)
  );
}

export function transformBackendNotesToNotes(notesData: any[]) {
  return notesData.map((note) => {
    const createdAt = note.created_at || note.createdAt;
    const updatedAt = note.updated_at || note.updatedAt;

    return {
      id: note.id,
      issueDate: note.issue_date || note.issueDate || null,
      label: note.label || null,
      note: note.note || null,
      fileUrl: note.file_url || note.fileUrl || null,
      attachments: note.attachments ? JSON.parse(note.attachments) : null,
      userId: note.userId || null,
      createdAt:
        createdAt instanceof Date ? createdAt.toISOString() : String(createdAt),
      updatedAt:
        updatedAt instanceof Date ? updatedAt.toISOString() : String(updatedAt),
    };
  });
}
