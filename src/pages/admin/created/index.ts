"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CourseForm from "@/components/courseForm/CourseForm";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";

// Schema for form validation
const moduleSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  duration: z.string().min(1, "Duration is required."),
  prerequisites: z.string().optional(),
  content: z.string().min(1, "Content is required."),
  exercises: z.array(
    z.object({
      title: z.string().min(2, "Exercise title must be at least 2 characters."),
      instructions: z
        .string()
        .min(10, "Instructions must be at least 10 characters."),
      expectedOutcome: z.string().min(1, "Expected outcome is required."),
      assessmentCriteria: z.string().optional(),
    })
  ),
  resources: z.array(
    z.object({
      title: z.string().min(2, "Resource title must be at least 2 characters."),
      type: z.enum(["document", "video", "link"]),
      url: z.string().url("Please enter a valid URL."),
    })
  ),
});

const courseFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  thumbnailUrl: z.string().url().optional(),
  learningObjectives: z
    .string()
    .min(10, "Learning objectives must be at least 10 characters."),
  prerequisites: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select a course level.",
  }),
  modules: z.array(moduleSchema).min(1, "At least one module is required."),
});

// Type inference for form values
type CourseFormValues = z.infer<typeof courseFormSchema>;

// Default values
const defaultValues: Partial<CourseFormValues> = {
  level: "beginner",
  modules: [
    {
      title: "",
      description: "",
      duration: "",
      prerequisites: "",
      content: "",
      exercises: [],
      resources: [],
    },
  ],
};

export default function CreateCoursePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  });

  async function onSubmit(data: CourseFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save course. Please try again.");
      }

      toast({
        title: "Success",
        description: "Course has been created successfully.",
      });

      router.push("/admin/content");
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const addModule = () => {
    const currentModules = form.getValues("modules");
    form.setValue("modules", [
      ...currentModules,
      {
        title: "",
        description: "",
        duration: "",
        prerequisites: "",
        content: "",
        exercises: [],
        resources: [],
      },
    ]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Create Course</h2>
              </div>
              <CourseForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
              <button type="button" onClick={addModule}>
                Add Module
              </button>
          </div>
          </AdminLayout>
        );
      }
