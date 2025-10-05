'use client';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = () => {
    // Redirect to Auth0 signup (screen_hint=signup)
    router.push('/api/auth/login?screen_hint=signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <button
        onClick={handleSignUp}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Sign Up with Auth0
      </button>
    </div>
  );
}
