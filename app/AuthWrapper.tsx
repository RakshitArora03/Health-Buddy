"use client"

import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation'
import Navbar from "@/components/Navbar";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const pathname = usePathname();

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthenticated && !isAuthPage) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-white text-black">
        <Navbar />
        <main className="flex-1 p-8 md:ml-64">
          {children}
        </main>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {children}
    </main>
  );
}
