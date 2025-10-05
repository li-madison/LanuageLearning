import './globals.css';
import ClientProviders from './ClientProviders';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Language Learning App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}