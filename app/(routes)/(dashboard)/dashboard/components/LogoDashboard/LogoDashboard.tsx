import Image from "next/image";
import Link from "next/link";

export function LogoDashboard() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center h-20 gap-2 border-b cursor-pointer"
    >
      <Image src="/logo.svg" alt="logo" width={30} height={30} priority />
      <h1 className="">TradeAnalytics</h1>
    </Link>
  );
}