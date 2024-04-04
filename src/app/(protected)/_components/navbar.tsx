"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/dashboard" ? "default" : "outline"}
        >
          <Link href="/dashboard">Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/settings" ? "default" : "outline"}
        >
          <Link href="/dashboard/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/server" ? "default" : "outline"}
        >
          <Link href="/dashboard/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/client" ? "default" : "outline"}
        >
          <Link href="/dashboard/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/admin" ? "default" : "outline"}
        >
          <Link href="/dashboard/admin">Admin</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
