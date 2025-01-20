"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useState } from "react";
import { Loader2, Upload, Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../layout";

const moduleSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    duration: z.string().min(1, "Duration is required."),
    prerequisites: z.string().optional(),
    content: z.string().min(1, "Content is required."),
    exercises: z.array(z.object({
      title: z.string().min(2, "Exercise title must be at least 2 characters."),
      instructions: z.string().min(10, "Instructions must be at least 10 characters."),
      expectedOutcome: z.string().min(1, "Expected outcome is required."),
      assessmentCriteria: z.string().optional(),
    })),
    resources: z.array(z.object({
      title: z.string().min(2, "Resource title must be at least 2 characters."),
      type: z.enum(["document", "video", "link"]),
      url: z.string().url("Please enter a valid URL."),
    })),
  });
  
  const courseFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    thumbnailUrl: z.string().url().optional(),
    learningObjectives: z.string().min(10, {
      message: "Learning objectives must be at least 10 characters.",
    }),
    prerequisites: z.string().optional(),
    level: z.enum(["beginner", "intermediate", "advanced"], {
      required_error: "Please select a course level.",
    }),
    modules: z.array(moduleSchema).min(1, "At least one module is required."),
  });
  
  type CourseFormValues = z.infer<typeof courseFormSchema>;
  
  const defaultValues: Partial<CourseFormValues> = {
    level: "beginner",
    modules: [{
      title: "",
      description: "",
      duration: "",
      prerequisites: "",
      content: "",
      exercises: [],
      resources: [],
    }],
  };
  
  export default function CreateCoursePage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
  
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
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      setIsUploading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        const uploadedUrl = `https://example.com/uploads/${file.name}`;
        form.setValue("thumbnailUrl", uploadedUrl);
  
        toast({
          title: "Success",
          description: "File uploaded successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload file. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    };
  
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
  
    const removeModule = (index: number) => {
      const currentModules = form.getValues("modules");
      form.setValue("modules", currentModules.filter((_, i) => i !== index));
    };
  
    const addExercise = (moduleIndex: number) => {
      const currentModules = form.getValues("modules");
      const updatedModules = [...currentModules];
      updatedModules[moduleIndex].exercises.push({
        title: "",
        instructions: "",
        expectedOutcome: "",
        assessmentCriteria: "",
      });
      form.setValue("modules", updatedModules);
    };
  
    const addResource = (moduleIndex: number) => {
      const currentModules = form.getValues("modules");
      const updatedModules = [...currentModules];
      updatedModules[moduleIndex].resources.push({
        title: "",
        type: "document",
        url: "",
      });
      form.setValue("modules", updatedModules);
    };

  return (
    <AdminLayout>
        <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create Course</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter course description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Thumbnail</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                          />
                          {field.value && (
                            <div className="rounded-md border p-4">
                              <p className="text-sm text-muted-foreground break-all">
                                Uploaded: {field.value}
                              </p>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload a thumbnail image for your course
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="learningObjectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Objectives</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What will students learn from this course?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prerequisites"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prerequisites (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What should students know before taking this course?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Course Modules</h3>
                    <Button
                      type="button"
                      onClick={addModule}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Module
                    </Button>
                  </div>

                  {form.watch("modules").map((module, moduleIndex) => (
                    <Card key={moduleIndex}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-base">
                          Module {moduleIndex + 1}
                        </CardTitle>
                        {moduleIndex > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeModule(moduleIndex)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`modules.${moduleIndex}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Module Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter module title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`modules.${moduleIndex}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Module Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter module description"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`modules.${moduleIndex}.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Duration</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., 2 hours"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`modules.${moduleIndex}.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Module Content</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter module content"
                                  className="min-h-[200px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">Exercises</h4>
                            <Button
                              type="button"
                              onClick={() => addExercise(moduleIndex)}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Exercise
                            </Button>
                          </div>

                          {module.exercises.map((_, exerciseIndex) => (
                            <div key={exerciseIndex} className="space-y-4 border rounded-lg p-4">
                              <FormField
                                control={form.control}
                                name={`modules.${moduleIndex}.exercises.${exerciseIndex}.title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Exercise Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter exercise title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`modules.${moduleIndex}.exercises.${exerciseIndex}.instructions`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Enter exercise instructions"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`modules.${moduleIndex}.exercises.${exerciseIndex}.expectedOutcome`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expected Outcome</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="What should students achieve?"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">Resources</h4>
                            <Button
                              type="button"
                              onClick={() => addResource(moduleIndex)}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Resource
                            </Button>
                          </div>

                          {module.resources.map((_, resourceIndex) => (
                            <div key={resourceIndex} className="space-y-4 border rounded-lg p-4">
                              <FormField
                                control={form.control}
                                name={`modules.${moduleIndex}.resources.${resourceIndex}.title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Resource Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter resource title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`modules.${moduleIndex}.resources.${resourceIndex}.type`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Resource Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select resource type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="document">Document</SelectItem>
                                        <SelectItem value="video">Video</SelectItem>
                                        <SelectItem value="link">Link</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`modules.${moduleIndex}.resources.${resourceIndex}.url`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Resource URL</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter resource URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/content")}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Course
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}