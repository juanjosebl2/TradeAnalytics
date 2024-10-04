import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center justify-center h-full lg:grid-cols-2">
      <div className="flex items-center justify-center">{children}</div>
      <div className="items-center justify-center hidden h-full lg:space-y-2 lg:bg-slate-300 lg:flex lg:flex-col">
      <Image src="/logo.svg" alt="logo" width={200} height={200} />
        <h1 className="text-xl font-bold">TradeAnalytics</h1>
      </div>
    </div>
  );
}