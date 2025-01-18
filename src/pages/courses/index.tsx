"use client";

import { CourseCard } from "@/components/course-card";
import { MainNav } from "@/components/main-nav";
import UserProfile from "@/components/user-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const allCourses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development with HTML, CSS, and JavaScript",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60",
    instructor: "John Doe",
    category: "Programming"
  },
  {
    id: "2",
    title: "Data Science Essentials",
    description: "Master the fundamentals of data science and analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    instructor: "Jane Smith",
    category: "Data Science"
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    description: "Complete guide to modern digital marketing strategies",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop&q=60",
    instructor: "Mike Johnson",
    category: "Marketing"
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    description: "Learn modern design principles and create stunning user interfaces",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
    instructor: "Sarah Wilson",
    category: "Design"
  },
];

const categories = ["All", "Programming", "Data Science", "Marketing", "Design"];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserProfile />
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/4">
            <div className="rounded-lg border p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Search</h3>
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Category</h3>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Price Range</h3>
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$0</span>
                  <span>$100</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Reset Filters
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}