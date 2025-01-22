"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminLayout from "../layout";

const contentTypes = ["All", "Course", "Article", "Video", "Resource"];

export default function ContentPage() {
  const [content, setContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [totalCourses, setTotalCourses] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/courses", { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch content.");
        const data = await response.json();
        setContent(data);
        setTotalCourses(data.length);
      } catch (error) {
        console.error(error);
      }
    }
    fetchContent();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setContent(content.filter((item) => item.id !== id));
        setTotalCourses(totalCourses - 1);
      } else {
        throw new Error("Failed to delete the course.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/content/create?id=${id}`);
  };

  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "All" || item.type === selectedType)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Content Management
          </h2>
          <div className="flex space-x-2">
            <Button asChild>
              <Link href="/admin/content/create" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Create Content
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourses}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Library</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" onClick={() => handleEdit(item.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" onClick={() => handleDelete(item.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
