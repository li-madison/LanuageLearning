// src/app/ClientProviders.tsx
'use client';
import { ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0'

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
