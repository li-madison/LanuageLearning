import './globals.css';
import ClientProviders from './ClientProviders';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';


export const metadata = {
  title: 'LittleLingo',
  icons:{
      icon: '/mascots/owl.png',
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
     
      <body>
      
        <ClientProviders><Navbar/>{children}</ClientProviders>
      </body>
    </html>
  );
}