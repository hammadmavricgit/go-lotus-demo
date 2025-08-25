/**
 * Role-Based Authorization Utilities
 * Provides middleware and utilities for role-based access control in frontend
 */


export type UserRole = 'admin' | 'staff';
export type UserStatus = 'Active' | 'Inactive' | 'Delete';

export interface UserPermissions {
  canManageUsers: boolean;
  canManageInvitations: boolean;
  canViewDashboard: boolean;
  canAccessAdminPanel: boolean;
  canEditProfile: boolean;
}

/**
 * Role-based permissions configuration
 */
const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  admin: {
    canManageUsers: true,
    canManageInvitations: true,
    canViewDashboard: true,
    canAccessAdminPanel: true,
    canEditProfile: true,
  },
  staff: {
    canManageUsers: false,
    canManageInvitations: false,
    canViewDashboard: true,
    canAccessAdminPanel: false,
    canEditProfile: true,
  },
};

/**
 * Get permissions for a specific role
 */
export function getPermissionsForRole(role: UserRole): UserPermissions {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.staff;
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  role: UserRole,
  permission: keyof UserPermissions
): boolean {
  const permissions = getPermissionsForRole(role);
  return permissions[permission] || false;
}



/**
 * Role-based route protection hook
 */
export function useRoleBasedAuth() {
  const checkAccess = async (
    requiredRole: UserRole,
    permission?: keyof UserPermissions
  ): Promise<boolean> => {
    try {
      // Get current user's role from API
      const response = await fetch('/api/auth/current-user');
      if (!response.ok) {
        return false;
      }

      const userData = await response.json();
      const userRole = userData.role as UserRole;

      // Check if user has required role
      if (userRole !== requiredRole && requiredRole === 'admin') {
        return false;
      }

      // Check specific permission if provided
      if (permission) {
        return hasPermission(userRole, permission);
      }

      return true;
    } catch (error) {
      console.error('Error checking role-based access:', error);
      return false;
    }
  };

  const requireRole = async (
    requiredRole: UserRole,
    redirectTo: string = '/'
  ): Promise<boolean> => {
    const hasAccess = await checkAccess(requiredRole);

    if (!hasAccess) {
      // Redirect to specified page
      window.location.href = redirectTo;
      return false;
    }

    return true;
  };

  const requirePermission = async (
    permission: keyof UserPermissions,
    redirectTo: string = '/'
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/current-user');
      if (!response.ok) {
        window.location.href = redirectTo;
        return false;
      }

      const userData = await response.json();
      const userRole = userData.role as UserRole;
      const hasAccess = hasPermission(userRole, permission);

      if (!hasAccess) {
        window.location.href = redirectTo;
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking permission:', error);
      window.location.href = redirectTo;
      return false;
    }
  };

  return {
    checkAccess,
    requireRole,
    requirePermission,
    getPermissionsForRole,
    hasPermission,
  };
}



