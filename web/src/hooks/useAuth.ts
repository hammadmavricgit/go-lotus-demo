'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  status: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('userData');
      // setAuthState({
      //   user: null,
      //   isLoading: false,
      //   isAuthenticated: true,
      // });

      if (accessToken && userData) {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // Clear invalid data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = (
    userData: User,
    tokens: { accessToken: string; refreshToken: string }
  ) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('userData', JSON.stringify(userData));

    setAuthState({
      user: userData,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');

    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    router.push('/auth');
  };

  const redirectToAuth = () => {
    router.push('/auth');
  };

  const redirectToDashboard = () => {
    router.push('/');
  };

  return {
    ...authState,
    login,
    logout,
    redirectToAuth,
    redirectToDashboard,
    checkAuthStatus,
  };
};
