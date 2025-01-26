import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TradeAnalytics",
  description:
    "Conoce más sobre TradeAnalytics y cómo optimizamos estrategias.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <head>
          <title>TradeAnalytics</title>
          <meta name="description" content="Conoce más sobre TradeAnalytics y cómo optimizamos estrategias." />
        </head>
        <body className={outfit.className}>
          <header>
            <h1 className="sr-only">TradeAnalytics</h1>
          </header>
          <NextTopLoader />
          {children}
          <div role="status" aria-live="polite">
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
