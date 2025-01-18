"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BookOpen, Home, MessageSquare, Settings } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.name}
            variant={pathname === item.href ? "default" : "ghost"}
            asChild
          >
            <Link
              href={item.href}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}