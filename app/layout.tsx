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
          <title>{String(metadata.title)}</title>
          <meta name="description" content={String(metadata.description)} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:title" content={String(metadata.title)} />
          <meta
            property="og:description"
            content={String(metadata.description)}
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/logo.svg" />
        </head>
        <body className={outfit.className}>
          <header>
            <h1 className="sr-only">{String(metadata.title)}</h1>
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
