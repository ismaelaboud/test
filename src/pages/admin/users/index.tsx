import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "../layout";

interface User {
  id: string;
  name: string;  // Changed from fullName to name
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
}

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError(error.message || "Something went wrong.");
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [toast]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Users List</h2>
          <Button onClick={() => window.location.assign("/admin/users/create")}>
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-10">{error}</div>
            ) : users.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No users found.
              </div>
            ) : (
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Full Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Email
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Role
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center">
                      Status
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border border-gray-200 px-4 py-2">
                        {user.name} 
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {user.email}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {user.role}
                      </td>
                      <td
                        className={`border border-gray-200 px-4 py-2 text-center ${
                          user.status ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {user.status ? "Active" : "Inactive"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
