'use client';

import { useState } from 'react';
import { SignIn } from '@clerk/nextjs';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { backendApi } from '@/lib/backend-api';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const LotusIcon = () => (
    <svg viewBox='0 0 100 100' className='w-16 h-16 mb-4'>
      {/* Lotus petals with gradient colors */}
      <defs>
        <linearGradient id='petal1' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#10B981' />
          <stop offset='100%' stopColor='#059669' />
        </linearGradient>
        <linearGradient id='petal2' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#06B6D4' />
          <stop offset='100%' stopColor='#0891B2' />
        </linearGradient>
        <linearGradient id='petal3' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#F59E0B' />
          <stop offset='100%' stopColor='#D97706' />
        </linearGradient>
        <linearGradient id='petal4' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#EC4899' />
          <stop offset='100%' stopColor='#DB2777' />
        </linearGradient>
        <linearGradient id='petal5' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#8B5CF6' />
          <stop offset='100%' stopColor='#7C3AED' />
        </linearGradient>
      </defs>

      {/* Lotus petals */}
      <path
        d='M50 20 Q35 40 50 60 Q65 40 50 20'
        fill='url(#petal1)'
        opacity='0.9'
      />
      <path
        d='M30 30 Q20 50 40 65 Q50 45 30 30'
        fill='url(#petal2)'
        opacity='0.9'
      />
      <path
        d='M70 30 Q80 50 60 65 Q50 45 70 30'
        fill='url(#petal3)'
        opacity='0.9'
      />
      <path
        d='M25 50 Q15 70 35 80 Q45 60 25 50'
        fill='url(#petal4)'
        opacity='0.9'
      />
      <path
        d='M75 50 Q85 70 65 80 Q55 60 75 50'
        fill='url(#petal5)'
        opacity='0.9'
      />

      {/* Center */}
      <circle cx='50' cy='55' r='8' fill='#FCD34D' opacity='0.8' />
    </svg>
  );

  const checkUserStatus = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      // Direct call to backend API
      const user = await backendApi.getUserByEmail(email.trim());

      if (user) {
        if (user.status === 'Active') {
          setShowSignIn(true);
          setError(null);
        } else if (user.status === 'Inactive') {
          setError(
            'Your account is deactivated. Please contact an administrator for assistance.'
          );
          setShowSignIn(false);
        } else if (user.status === 'Delete') {
          setError(
            'Your account has been deleted. Please contact an administrator for assistance.'
          );
          setShowSignIn(false);
        }
      } else {
        setError(
          'No account found with this email address. Please contact an administrator to create an account.'
        );
        setShowSignIn(false);
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      setError('Network error. Please check your connection and try again.');
      setShowSignIn(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkUserStatus();
  };

  const resetForm = () => {
    setEmail('');
    setShowSignIn(false);
    setError(null);
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <div
        className='min-h-screen flex items-center justify-center relative overflow-hidden'
        style={{
          background:
            'linear-gradient(135deg, #4C1D95 0%, #7C2D92 25%, #9333EA 50%, #A855F7 75%, #C084FC 100%)',
        }}
      >
        {/* Background pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full'></div>
          <div className='absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full'></div>
          <div className='absolute bottom-20 left-20 w-40 h-40 border border-white/20 rounded-full'></div>
          <div className='absolute bottom-40 right-10 w-20 h-20 border border-white/20 rounded-full'></div>
        </div>

        <div className='w-full max-w-md mx-4 relative z-10'>
          {/* Brand Header */}
          <div className='text-center mb-8'>
            <div className='flex justify-center'>
              <LotusIcon />
            </div>
            <h1 className='text-4xl font-bold text-white mb-2'>
              go
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-300'>
                LOTUS
              </span>
            </h1>
            <p className='text-purple-200 text-sm'>
              Brand & Digital Design Platform
            </p>
          </div>

          {/* Email Check Form or SignIn Component */}
          <div className='bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20'>
            {!showSignIn ? (
              <>
                <div className='mb-6'>
                  <h2 className='text-2xl font-semibold text-white text-center'>
                    Welcome Back
                  </h2>
                  <p className='text-purple-200 text-center text-sm mt-2'>
                    Enter your email to continue
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className='space-y-4'>
                  <div>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email address'
                      className='w-full bg-white/20 border border-white/30 text-white placeholder-purple-200 rounded-lg h-12 px-4 focus:bg-white/30 focus:border-purple-300 transition-all'
                      disabled={isChecking}
                    />
                  </div>

                  {error && (
                    <div className='bg-red-500/20 border border-red-400/50 rounded-lg p-3'>
                      <p className='text-red-200 text-sm text-center'>
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    type='submit'
                    disabled={isChecking}
                    className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isChecking ? 'Checking...' : 'Continue'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className='mb-6'>
                  <h2 className='text-2xl font-semibold text-white text-center'>
                    Welcome Back
                  </h2>
                  <p className='text-purple-200 text-center text-sm mt-2'>
                    Sign in to your account
                  </p>
                  <p className='text-purple-300 text-center text-xs mt-1'>
                    Account verified: {email}
                  </p>
                </div>

                <SignIn
                  initialValues={{
                    emailAddress: email,
                  }}
                  appearance={{
                    elements: {
                      formButtonPrimary:
                        'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
                      card: 'bg-transparent shadow-none',
                      headerTitle: 'text-white text-2xl font-semibold',
                      headerSubtitle: 'text-purple-200 text-sm',
                      formFieldInput:
                        'bg-white/20 border-white/30 text-white placeholder-purple-200 rounded-lg h-12 px-4 focus:bg-white/30 focus:border-purple-300 transition-all',
                      formFieldLabel: 'text-white text-sm font-medium',
                      footerActionLink:
                        'text-purple-300 hover:text-white font-medium',
                      footerActionText: 'text-purple-200 text-sm',
                      dividerLine: 'bg-white/20',
                      dividerText: 'text-purple-200 text-sm',
                      formFieldErrorText: 'text-red-200 text-sm',
                      alertText: 'text-red-200 text-sm',
                      alert:
                        'bg-red-500/20 border border-red-400/50 rounded-lg p-3',
                    },
                  }}
                />

                <div className='mt-4 text-center'>
                  <button
                    onClick={resetForm}
                    className='text-purple-300 hover:text-white text-sm font-medium'
                  >
                    Use different email
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className='text-center mt-8'>
            <p className='text-purple-300 text-xs'>
              © 2025 Go Lotus. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
