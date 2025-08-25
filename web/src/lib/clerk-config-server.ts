import { clerkClient } from '@clerk/nextjs/server';

/**
 * Clerk Configuration Utilities (Server-Side)
 * Provides helper functions for Clerk authentication setup and validation
 * Only use in server components or API routes
 */

export interface ClerkServerConfig {
  publishableKey: string;
  secretKey: string;
  signInUrl: string;
  signUpUrl: string;
  afterSignInUrl: string;
  afterSignUpUrl: string;
}

/**
 * Get Clerk configuration from environment variables (server-side)
 */
export function getClerkServerConfig(): ClerkServerConfig {
  const config: ClerkServerConfig = {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth',
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/auth',
    afterSignInUrl:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/',
    afterSignUpUrl:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/',
  };

  // Validate required environment variables
  if (!config.publishableKey) {
    throw new Error('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required');
  }
  if (!config.secretKey) {
    throw new Error('CLERK_SECRET_KEY is required');
  }

  return config;
}

/**
 * Validate Clerk configuration (server-side)
 */
export function validateClerkServerConfig(): boolean {
  try {
    getClerkServerConfig();
    return true;
  } catch (error) {
    console.error('Clerk server configuration validation failed:', error);
    return false;
  }
}

/**
 * Get user by Clerk ID (server-side)
 */
export async function getUserByClerkId(clerkId: string) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(clerkId);
    return user;
  } catch (error) {
    console.error('Error fetching user by Clerk ID:', error);
    return null;
  }
}

/**
 * Get user by email (server-side)
 */
export async function getUserByEmail(email: string) {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList({
      emailAddress: [email],
    });
    return users.data[0] || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

/**
 * Create user in Clerk (server-side)
 */
export async function createClerkUser(
  email: string,
  firstName?: string,
  lastName?: string
) {
  try {
    const client = await clerkClient();
    const user = await client.users.createUser({
      emailAddress: [email],
      firstName,
      lastName,
    });
    return user;
  } catch (error) {
    console.error('Error creating user in Clerk:', error);
    throw error;
  }
}

/**
 * Update user in Clerk (server-side)
 */
export async function updateClerkUser(
  clerkId: string,
  updates: {
    firstName?: string;
    lastName?: string;
    emailAddress?: string[];
  }
) {
  try {
    const client = await clerkClient();
    const user = await client.users.updateUser(clerkId, updates);
    return user;
  } catch (error) {
    console.error('Error updating user in Clerk:', error);
    throw error;
  }
}

/**
 * Delete user in Clerk (server-side)
 */
export async function deleteClerkUser(clerkId: string) {
  try {
    const client = await clerkClient();
    await client.users.deleteUser(clerkId);
    return true;
  } catch (error) {
    console.error('Error deleting user in Clerk:', error);
    throw error;
  }
}



/**
 * Check if Clerk is properly configured (server-side)
 */
export function isClerkServerConfigured(): boolean {
  return validateClerkServerConfig();
}
