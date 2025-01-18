import Link from "next/link";
import { Users, LayoutDashboard, BookOpen, Settings } from "lucide-react";

const AdminSidebar = () => {
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      label: "Courses",
      icon: BookOpen,
      href: "/admin/courses",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
          >
            <div className="flex items-center gap-x-2 py-4">
              <route.icon size={22} />
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;