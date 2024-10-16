"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { userId } = useAuth();
  return (
    <div className="py-5 mx-auto max-w-7xl">
      <div className="justify-between lg:flex">
        <Link
          href="/"
          className="flex items-center justify-center mb-4 gap-x-2 lg:mb-0"
        >
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <span className="text-xl font-bold">TradeAnalytics</span>
        </Link>

        <div className="flex items-center justify-center gap-x-7">
          <Link href="/symbol">Simbolos</Link>
          <Link href="/dashboard">Probador de estrategias</Link>
          {!userId ? (
            <>
              <Link href="/sign-in" className="flex gap-x-3">
                <Button>
                  Iniciar sesión
                  <User className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
