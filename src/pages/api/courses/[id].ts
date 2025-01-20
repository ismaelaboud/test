import {prisma} from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    // Fetch course with related modules, exercises, and resources
    const course = await prisma.course.findUnique({
      where: { id: id as string },
      include: {
        modules: {
          include: {
            exercises: true, // Include exercises for each module
            resources: true, // Include resources for each module
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
