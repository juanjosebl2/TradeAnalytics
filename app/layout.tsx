import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TradeAnalytics",
  description: "Conoce más sobre TradeAnalytics y cómo optimizamos estrategias.",
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
        </head>
        <body className={outfit.className}>
          <NextTopLoader />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
