'use client';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  return (
    <a href="/api/auth/logout">Logout</a>
  );
}
