export interface ProfileData {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  clerkId: string;
  status: 'Active' | 'Inactive' | 'Delete';
  role: 'admin' | 'staff';
  primary_phone: string | null;
  signature: string | null;
  title: string | null;
  bio: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip_code: number | null;
  date_of_birth: string | null;
  gender: string | null;
  work_phone: string | null;
  home_phone: string | null;
  social_security_number: string | null;
  created_at: Date;
  updated_at: Date;
  imageUrl?: string | null;
  lastLoginDate?: string | null;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  primary_phone: string;
  title: string;
  bio: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  signature: string;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  primary_phone?: string;
  title?: string;
  bio?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip_code?: number;
  signature?: string;
  imageUrl?: string | null;
}

// Reuse FileAttachment interface from notes system
export interface FileAttachment {
  id: string;
  url: string;
  publicId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface ProfileImageUpload {
  file: File;
  preview: string;
  uploading?: boolean;
  error?: string;
}

export interface Note {
  id: number;
  issue_date: string | null;
  label: string | null;
  note: string | null;
  file_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProfilePictureUpload {
  file: File;
  preview: string;
}

export interface ProfessionalTitle {
  value: string;
  label: string;
}

export const PROFESSIONAL_TITLES: ProfessionalTitle[] = [
  { value: 'therapist', label: 'Therapist' },
  { value: 'counselor', label: 'Counselor' },
  { value: 'psychologist', label: 'Psychologist' },
  { value: 'social_worker', label: 'Social Worker' },
  { value: 'case_manager', label: 'Case Manager' },
  { value: 'administrator', label: 'Administrator' },
  { value: 'coordinator', label: 'Coordinator' },
  { value: 'other', label: 'Other (specify)' },
];
