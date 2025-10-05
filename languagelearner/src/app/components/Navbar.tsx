'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0'; // <-- note /client import

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ✅ call useUser at the top of the component
  const { user, isLoading } = useUser();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Game', href: '/game' },
    { name: 'About', href: '/about' },
  ];

  if (!mounted || isLoading) return null; // optional guard while loading

  return (
    <nav className="sticky top-0 z-50 bg-[#ffff] shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-4xl font-bold text-gray-900 text">
                LittleLingo
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
          {!user && !isLoading && (
            <>
              <Link
                href="/signin"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
        
            <Link
              href="/signup"
              className="bg-[#1EC0FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#0ea5e9] transition-all duration-200 transform hover:scale-105"
            >
              Sign Up
            </Link>
            </>
          )}
          {user && (
              <Link
                href="/logout"
                className="bg-[#1EC0FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#0ea5e9] transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </Link>
            )}
           
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                pathname === item.href
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile auth buttons */}
          <div className="pt-4 border-t border-gray-200">
            {!user && (
              <Link
                href="/api/auth/login"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/api/auth/login?screen_hint=signup"
              className="block pl-3 pr-4 py-2 text-base font-medium text-[#1EC0FF] hover:text-[#0ea5e9] hover:bg-blue-50 transition-colors duration-200"
            >
              Sign Up
            </Link>
            {user && (
              <Link
                href="/api/auth/logout"
                className="block pl-3 pr-4 py-2 text-base font-medium text-[#1EC0FF] hover:text-[#0ea5e9] hover:bg-blue-50 transition-colors duration-200"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
