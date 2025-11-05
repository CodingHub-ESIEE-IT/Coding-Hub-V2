'use client';
import React, {useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";

interface AuthCheckerProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export default function AuthChecker({ isAuthenticated, children }: AuthCheckerProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/connexion') {
      router.push('/connexion');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && pathname !== '/connexion') {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Redirection...</p>
          </div>
        </div>
    );
  }

  return <>{children}</>;
};