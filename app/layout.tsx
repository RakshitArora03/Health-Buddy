"use client"

import "@/app/globals.css";
import { Toaster } from 'react-hot-toast'
import { Providers } from "./providers";
import AuthWrapper from "./AuthWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <AuthWrapper>
            {children}
          </AuthWrapper>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
