import { Staff } from '@/lib/types/staff';

/**
 * User entity structure from backend
 */
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  clerkId: string;
  status: 'Active' | 'Inactive' | 'Delete';
  role: 'admin' | 'staff';
  title?: string;
  phone?: string;
  mobilePhone?: string;
  supervisor?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Transform User entity to Staff format for frontend compatibility
 */
export function transformUserToStaff(user: User): Staff {
  return {
    id: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email,
    status: user.status === 'Active' ? 'Current' : 'Archived',
    role: user.role,
    primaryPhone: user.phone || user.mobilePhone || null,
    signature: null,
    title: user.title || null,
    bio: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zipCode: null,
    dateOfBirth: null,
    gender: null,
    workPhone: null,
    homePhone: null,
    socialSecurityNumber: null,
  };
}

/**
 * Transform Staff format to User entity for backend compatibility
 */
export function transformStaffToUser(staff: Partial<Staff>): Partial<User> {
  return {
    email: staff.email || `${staff.firstName?.toLowerCase() || 'staff'}.${staff.lastName?.toLowerCase() || 'member'}@example.com`,
    firstName: staff.firstName || '',
    lastName: staff.lastName || '',
    role: 'staff',
    status: staff.status === 'Current' ? 'Active' : 'Inactive',
    title: staff.title || undefined,
    phone: staff.primaryPhone || undefined,
  };
}

/**
 * Transform array of Users to Staff format
 */
export function transformUsersToStaff(users: User[]): Staff[] {
  return users.map(transformUserToStaff);
}

/**
 * Validate if a User is a staff member
 */
export function isStaffUser(user: User): boolean {
  return user.role === 'staff';
}

/**
 * Get display name from User entity
 */
export function getUserDisplayName(user: User): string {
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  return fullName || user.email || 'Unknown';
} 