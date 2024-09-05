"use client";

import { applicationName } from "@/app-config";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderLogo() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <Link
      href={isDashboard ? "/" : "/"}
      className="flex gap-2 items-center text-xl"
    >
      <Image
        className="rounded"
        width={50}
        height={50}
        src="/hive-logo.png"
        alt="hero image"
        priority // Add priority property
        style={{ width: 'auto', height: 'auto' }} // Ensure aspect ratio is maintained
      />
    </Link>
  );
}
