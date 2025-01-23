import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CourseDetail({ course: initialCourse }) {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(initialCourse); // Define state for the course
  const [loading, setLoading] = useState(!initialCourse); // Set loading based on whether initialCourse exists
  const [error, setError] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState(null); // State for toggling modules

  useEffect(() => {
    if (!id || course) return;

    async function fetchCourse() {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();
        setCourse(data); // Set the course data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id, course]);

  if (loading) return <p className="text-center text-lg mt-10">Loading course details...</p>;
  if (error) return <p className="text-center text-lg mt-10 text-red-500">Error: {error}</p>;
  if (!course) return <p className="text-center text-lg mt-10">Course not found.</p>;

  const toggleModule = (moduleId) => {
    setActiveModuleId((prevId) => (prevId === moduleId ? null : moduleId)); // Toggle module content
  };

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
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500 font-medium block">Learning Objectives:</span>
            <ul className="text-sm text-gray-500 font-medium list-disc list-inside">
              {course.learningObjectives.split(",").map((objective, index) => (
                <li key={index}>{objective.trim()}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Modules Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Modules</h2>
        <div className="space-y-4">
          {course.modules.map((module) => (
            <Card key={module.id}>
              <CardHeader
                className="cursor-pointer hover:bg-gray-100 p-4"
                onClick={() => toggleModule(module.id)} // Toggle on click
              >
                <CardTitle className="text-xl flex justify-between items-center">
                  {module.title}
                  <span>
                    {activeModuleId === module.id ? "▲" : "▼"}
                  </span>
                </CardTitle>
              </CardHeader>
              {activeModuleId === module.id && (
                <CardContent className="p-4">
                  <p className="text-gray-700 mb-4">{module.content}</p> {/* Display content */}

                  {/* Exercises */}
                  {module.exercises && module.exercises.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Exercises</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {module.exercises.map((exercise) => (
                          <li key={exercise.id} className="text-gray-700">
                            <span className="font-medium">{exercise.title}:</span>{" "}
                            {exercise.instructions}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Resources */}
                  {module.resources && module.resources.length > 0 && (
                    <div>
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
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const { id } = context.params;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/courses/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch course");
    }
    const course = await res.json();

    return {
      props: { course },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}
