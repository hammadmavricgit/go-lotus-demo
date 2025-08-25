/**
 * Clerk User Sync Service (Server-Side)
 * Handles synchronization between Clerk and backend database
 * Only use in server components or API routes
 */

import {
  backendApi,
  CreateUserRequest,
  UpdateUserRequest,
} from './backend-api';
import {
  createClerkUser,
} from './clerk-config-server';

export interface ClerkUserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClerkWebhookEvent {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  image_url?: string;
  created_at: number;
  updated_at: number;
}

/**
 * Clerk User Sync Service Class
 */
export class ClerkUserSyncService {
  // Track synced users to prevent duplicate syncs in the same session
  private syncedUserIds = new Set<string>();

  /**
   * Sync user data to backend database
   */
  async syncUserToBackend(userData: ClerkUserData): Promise<void> {
    try {
      // Check if this user has already been synced in this session
      if (this.syncedUserIds.has(userData.id)) {
        console.log('User already synced in this session, skipping:', userData.email);
        return;
      }

      console.log('Syncing user to backend:', userData.email);

      // Check if user already exists in backend
      const existingUser = await backendApi.getUserByClerkId(userData.id);

      console.log('existingUser', existingUser);
      if (existingUser) {
        // Only update missing name fields; do not overwrite existing names
        const needsFirstNameUpdate =
          !existingUser.firstName || existingUser.firstName.trim() === '';
        const needsLastNameUpdate =
          !existingUser.lastName || existingUser.lastName.trim() === '';

        const updates: Partial<UpdateUserRequest> = {};
        if (needsFirstNameUpdate && userData.firstName) {
          updates.firstName = userData.firstName;
        }
        if (needsLastNameUpdate && userData.lastName) {
          updates.lastName = userData.lastName;
        }

        if (Object.keys(updates).length > 0) {
          await backendApi.updateUser(existingUser.id, updates);
          console.log('Updated missing name fields for user in backend:', userData.email);
        } else {
          console.log('No name updates needed for existing user; skipping backend update.');
        }
      } else {
        // Create new user
        const createRequest: CreateUserRequest = {
          email: userData.email,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          clerkId: userData.id,
          role: 'staff', // Default role
          status: 'Active',
        };

        await backendApi.createUser(createRequest);
        console.log('Created new user in backend:', userData.email);
      }

      // Mark this user as synced in this session
      this.syncedUserIds.add(userData.id);
    } catch (error) {
      console.error('Error syncing user to backend:', error);
      throw error;
    }
  }

  /**
   * Get user from backend by Clerk ID
   */
  async getUserFromBackend(clerkId: string) {
    try {
      return await backendApi.getUserByClerkId(clerkId);
    } catch (error) {
      console.error('Error getting user from backend:', error);
      return null;
    }
  }

  /**
   * Handle user created event from Clerk webhook
   */
  async handleUserCreated(userData: ClerkWebhookEvent): Promise<void> {
    try {
      console.log('Handling user created event:', userData.id);

      const clerkUserData: ClerkUserData = {
        id: userData.id,
        email: userData.email_addresses[0]?.email_address || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        fullName: userData.full_name || '',
        imageUrl: userData.image_url || '',
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      };

      await this.syncUserToBackend(clerkUserData);
    } catch (error) {
      console.error('Error handling user created event:', error);
      throw error;
    }
  }

  /**
   * Handle user updated event from Clerk webhook
   */
  async handleUserUpdated(userData: ClerkWebhookEvent): Promise<void> {
    try {
      console.log('Handling user updated event:', userData.id);

      const clerkUserData: ClerkUserData = {
        id: userData.id,
        email: userData.email_addresses[0]?.email_address || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        fullName: userData.full_name || '',
        imageUrl: userData.image_url || '',
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      };

      await this.syncUserToBackend(clerkUserData);
    } catch (error) {
      console.error('Error handling user updated event:', error);
      throw error;
    }
  }

  /**
   * Handle user deleted event from Clerk webhook
   */
  async handleUserDeleted(clerkId: string): Promise<void> {
    try {
      console.log('Handling user deleted event:', clerkId);

      // Get user from backend by Clerk ID
      const existingUser = await backendApi.getUserByClerkId(clerkId);

      if (existingUser) {
        // Mark user as deleted instead of actually deleting (soft delete)
        await backendApi.updateUser(existingUser.id, { status: 'Delete' });
        console.log(`Marked user as deleted in backend: ${existingUser.email}`);
      } else {
        console.log(`User not found in backend for deletion: ${clerkId}`);
      }
    } catch (error) {
      console.error('Error handling user deleted event:', error);
      throw error;
    }
  }

  /**
   * Handle email updated event from Clerk webhook
   */
  async handleEmailUpdated(clerkId: string, email: string): Promise<void> {
    try {
      console.log('Handling email updated event:', email);

      // Get user from backend by Clerk ID
      const existingUser = await backendApi.getUserByClerkId(clerkId);

      if (existingUser) {
        // Update email in backend
        await backendApi.updateUser(existingUser.id, { email });
        console.log(`Updated email in backend: ${email}`);
      } else {
        console.log(`User not found in backend for email update: ${clerkId}`);
      }
    } catch (error) {
      console.error('Error handling email updated event:', error);
      throw error;
    }
  }

  /**
   * Create user with invitation (for admin use)
   */
  async createUserWithInvitation(
    email: string,
    firstName?: string,
    lastName?: string
  ): Promise<ClerkUserData> {
    try {
      console.log('Creating user with invitation:', email);

      // First, create user in Clerk
      const clerkUser = await createClerkUser(email, firstName, lastName);

      if (!clerkUser) {
        throw new Error('Failed to create user in Clerk');
      }

      // Prepare user data for backend sync
      const userData: ClerkUserData = {
        id: clerkUser.id,
        email: email,
        firstName: firstName || '',
        lastName: lastName || '',
        fullName: clerkUser.fullName || '',
        imageUrl: clerkUser.imageUrl || '',
        createdAt: new Date(clerkUser.createdAt),
        updatedAt: new Date(clerkUser.updatedAt),
      };

      // Sync to backend
      await this.syncUserToBackend(userData);

      return userData;
    } catch (error) {
      console.error('Error creating user with invitation:', error);
      throw error;
    }
  }

  /**
   * Update user role in backend
   */
  async updateUserRole(
    clerkId: string,
    role: 'admin' | 'staff'
  ): Promise<void> {
    try {
      const existingUser = await backendApi.getUserByClerkId(clerkId);

      if (existingUser) {
        await backendApi.updateUser(existingUser.id, { role });
        console.log(`Updated user role to ${role}: ${existingUser.email}`);
      } else {
        throw new Error(`User not found in backend: ${clerkId}`);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }

  /**
   * Update user status in backend
   */
  async updateUserStatus(
    clerkId: string,
    status: 'Active' | 'Inactive' | 'Delete'
  ): Promise<void> {
    try {
      const existingUser = await backendApi.getUserByClerkId(clerkId);

      if (existingUser) {
        await backendApi.updateUser(existingUser.id, { status });
        console.log(`Updated user status to ${status}: ${existingUser.email}`);
      } else {
        throw new Error(`User not found in backend: ${clerkId}`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  /**
   * Soft delete user (mark as deleted)
   */
  async softDeleteUser(clerkId: string): Promise<void> {
    try {
      const existingUser = await backendApi.getUserByClerkId(clerkId);

      if (existingUser) {
        await backendApi.updateUser(existingUser.id, { status: 'Delete' });
        console.log(`Soft deleted user in backend: ${existingUser.email}`);
      } else {
        throw new Error(`User not found in backend: ${clerkId}`);
      }
    } catch (error) {
      console.error('Error soft deleting user:', error);
      throw error;
    }
  }

  /**
   * Hard delete user (permanently remove)
   * Use with caution - this permanently removes the user record
   */
  async hardDeleteUser(clerkId: string): Promise<void> {
    try {
      const existingUser = await backendApi.getUserByClerkId(clerkId);

      if (existingUser) {
        await backendApi.deleteUser(existingUser.id);
        console.log(`Hard deleted user from backend: ${existingUser.email}`);
      } else {
        throw new Error(`User not found in backend: ${clerkId}`);
      }
    } catch (error) {
      console.error('Error hard deleting user:', error);
      throw error;
    }
  }
}

// Export a default instance
export const clerkUserSync = new ClerkUserSyncService();
