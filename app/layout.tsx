import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import {IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
// import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'



const IBMPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Lanmai",
  description: "AI-powered design tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body 
    //     className={cn("font-IBMPlex antialiased", IBMPlex.variable)}
    //   >
    //     {children}
    //   </body>
    // </html>

    <ClerkProvider>
      <html lang="en">
        <body>
          {/* <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header > */}
          <main className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
