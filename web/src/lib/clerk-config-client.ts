/**
 * Clerk Configuration Utilities (Client-Side)
 * Provides helper functions for Clerk authentication setup and validation
 * Safe to use in client components
 */

export interface ClerkConfig {
  publishableKey: string;
  signInUrl: string;
  signUpUrl: string;
  afterSignInUrl: string;
  afterSignUpUrl: string;
}

/**
 * Get Clerk configuration from environment variables (client-side)
 */
export function getClerkConfig(): ClerkConfig {
  const config: ClerkConfig = {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
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

  return config;
}

/**
 * Validate Clerk configuration (client-side)
 */
export function validateClerkConfig(): boolean {
  try {
    getClerkConfig();
    return true;
  } catch (error) {
    console.error('Clerk configuration validation failed:', error);
    return false;
  }
}

/**
 * Check if Clerk is properly configured (client-side)
 */
export function isClerkConfigured(): boolean {
  return validateClerkConfig();
}
