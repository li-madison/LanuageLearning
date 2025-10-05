// src/components/SignInForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInForm() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/api/auth/login'); // Auth0 login
  };

  return (
    <div className="min-h-screen bg-[#77d9ff] bg-stripes flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-[#1EC0FF] mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to continue your learning journey</p>
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            className="w-full bg-[#1EC0FF] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#0ea5e9] transition-all duration-200 transform hover:scale-105"
          >
            Sign In with Auth0
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#1EC0FF] font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
