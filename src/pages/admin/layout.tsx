"use client";

import UserProfile from "@/components/user-profile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  BarChart,
  Users,
  FileText,
  Settings,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    title: "Analytics",
    href: "/admin",
    icon: BarChart,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserProfile />
          </div>
        </div>
      </header>
      <div className="flex">
        <aside
          className={cn(
            "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform md:translate-x-0",
            !sidebarOpen && "-translate-x-full"
          )}
        >
          <nav className="space-y-2 p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href} className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </aside>
        <main
          className={cn(
            "flex-1 transition-all",
            sidebarOpen ? "md:ml-64" : ""
          )}
        >
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}