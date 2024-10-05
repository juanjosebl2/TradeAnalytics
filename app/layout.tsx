import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider, SignOutButton } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin TradeAnalytics",
  description: "Tester strategy by TradeAnalytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          variables: {
            colorPrimary: "blue",
            colorText: "black",
          },
        },
      }}
    >
      <html lang="en">
        <body className={outfit.className}>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          <SignOutButton>
      <button>My custom button</button>
    </SignOutButton>

          <NextTopLoader />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
