import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchCourse() {
      try {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center text-lg mt-10">Loading course details...</p>;
  if (error) return <p className="text-center text-lg mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Course Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="flex space-x-4">
            <span className="text-sm text-gray-500 font-medium">Level: {course.level}</span>
            <span className="text-sm text-gray-500 font-medium">
              Learning Objectives: {course.learningObjectives}
            </span>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Modules Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Modules</h2>
        <div className="space-y-6">
          {course.modules.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle className="text-xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <p className="text-gray-500 text-sm mb-4">Duration: {module.duration}</p>

                {/* Exercises */}
                {/* <div className="mb-4">
                  <h4 className="font-bold mb-2">Exercises</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {module.exercises.map((exercise) => (
                      <li key={exercise.id} className="text-gray-700">
                        <span className="font-medium">{exercise.title}:</span> {exercise.instructions}
                      </li>
                    ))}
                  </ul>
                </div> */}

                {/* Resources */}
                {/* <div>
                  <h4 className="font-bold mb-2">Resources</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {module.resources.map((resource) => (
                      <li key={resource.id}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {resource.title} ({resource.type})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
