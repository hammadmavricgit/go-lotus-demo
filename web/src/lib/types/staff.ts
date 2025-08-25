/**
 * Staff data types based on backend User entity (filtered by role=staff)
 */

export interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: StaffStatus;
  role: string;
  primaryPhone: string | null;
  signature: string | null;
  title: string | null;
  bio: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: number | null;
  dateOfBirth: string | null;
  gender: string | null;
  workPhone: string | null;
  homePhone: string | null;
  socialSecurityNumber: string | null;
}

export interface StaffCreate {
  firstName: string;
  lastName: string;
  email: string;
  status: StaffStatus;
  role: string;
  primaryPhone?: string;
  signature?: string;
  title?: string;
  bio?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: number;
  dateOfBirth?: string;
  gender?: string;
  workPhone?: string;
  homePhone?: string;
  socialSecurityNumber?: string;
}

export interface StaffUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: StaffStatus;
  role?: string;
  primaryPhone?: string;
  signature?: string;
  title?: string;
  bio?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: number;
  dateOfBirth?: string;
  gender?: string;
  workPhone?: string;
  homePhone?: string;
  socialSecurityNumber?: string;
}

export type StaffStatus = 'Current' | 'Archived';

export interface StaffListResponse {
  data: Staff[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface StaffFilters {
  search?: string;
  status?: StaffStatus;
  page?: number;
  limit?: number;
}

export interface StaffSortOptions {
  field: 'firstName' | 'lastName' | 'email' | 'title' | 'status' | 'role';
  direction: 'ASC' | 'DESC';
}
