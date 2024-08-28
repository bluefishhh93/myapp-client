"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import * as NProgress from "nprogress";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutItem() {
  const router = useRouter();
  const handleSignOut = async () => {
    NProgress.start();
    try {
      await signOut({ redirect: false }); // Prevent automatic redirect
      router.push("/"); // Redirect to home page
      router.refresh(); // Refresh the page
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      NProgress.done();
    }
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={handleSignOut} // Use onClick for dropdown menu item
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </DropdownMenuItem>
  );
}
