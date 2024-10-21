"use client"

import { useState } from 'react'
import { Home, User, Search, Clock, LogOut, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function Navbar() {
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NavLink = ({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) => (
    <Button 
      variant={pathname === href ? "secondary" : "ghost"} 
      className={`w-full justify-start ${pathname === href ? "bg-gray-300 text-black" : "text-gray-300 hover:bg-gray-300 hover:text-black"}`} 
      asChild
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Link>
    </Button>
  )

  return (
    <>
      <nav className="bg-gray-900 text-white">
        {/* Mobile menu button */}
        <div className="md:hidden flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">HEALTH BUDDY</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden md:block fixed h-full w-64 p-4 overflow-y-auto bg-gray-900">
          <h1 className="text-2xl font-bold mb-8 pt-4">HEALTH BUDDY</h1>
          <nav className="space-y-4">
            <NavLink href="/" icon={Home}>Home</NavLink>
            <NavLink href="/profile" icon={User}>Profile</NavLink>
            <NavLink href="/analyzer" icon={Search}>Analyzer</NavLink>
            <NavLink href="/history" icon={Clock}>History</NavLink>
          </nav>
          <Button 
            variant="ghost" 
            className="w-full justify-start mt-8 text-gray-300 hover:bg-gray-300 hover:text-black" 
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </aside>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-gray-900 z-50">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-2xl font-bold">HEALTH BUDDY</h1>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="space-y-4 p-4">
              <NavLink href="/" icon={Home}>Home</NavLink>
              <NavLink href="/profile" icon={User}>Profile</NavLink>
              <NavLink href="/analyzer" icon={Search}>Analyzer</NavLink>
              <NavLink href="/history" icon={Clock}>History</NavLink>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-300 hover:bg-gray-300 hover:text-black" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowLogoutDialog(true);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will end your current session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
