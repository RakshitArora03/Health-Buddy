"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function HomeContent() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Health Buddy, {session?.user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyze Prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Upload and analyze your prescription using our advanced AI.</p>
            <Button className="mt-4" asChild>
              <Link href="/analyzer">Go to Analyzer</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Check your past analyses and track your health journey.</p>
            <Button className="mt-4" asChild>
              <Link href="/history">View History</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your account settings and personal information.</p>
            <Button className="mt-4" asChild>
              <Link href="/profile">Go to Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Always consult with a healthcare professional for medical advice.</li>
            <li>Keep your prescriptions organized and easily accessible.</li>
            <li>Regularly update your health information for accurate analyses.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
