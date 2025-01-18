import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) return null; // Show nothing if not logged in

  return (
    <div className="absolute top-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage
              src={session.user?.image || "/default-avatar.png"}
              alt={session.user?.name || "User"}
            />
            <AvatarFallback>
              {session.user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <div className="p-4">
            <p className="font-bold text-gray-800">{session.user?.name}</p>
            <p className="text-sm text-gray-500">{session.user?.email}</p>
          </div>
          <DropdownMenuItem onClick={() => alert("Go to Profile!")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Go to Settings!")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-red-500 hover:bg-red-100"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
