import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Module = {
  title: string;
  description: string;
  duration: string;
  prerequisites?: string;
  content: string;
  exercises: {
    title: string;
    instructions: string;
    expectedOutcome: string;
    assessmentCriteria?: string;
  }[];
  resources: {
    title: string;
    type: "document" | "video" | "link";
    url: string;
  }[];
};

type CourseBody = {
  title: string;
  description: string;
  thumbnailUrl?: string;
  learningObjectives: string;
  prerequisites?: string;
  level: "beginner" | "intermediate" | "advanced";
  modules: Module[];
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, thumbnailUrl, learningObjectives, prerequisites, level, modules }: CourseBody = req.body;

    try {
      const course = await prisma.course.create({
        data: {
          title,
          description,
          thumbnailUrl,
          learningObjectives,
          prerequisites,
          level,
          modules: {
            create: modules.map((module) => ({
              title: module.title,
              description: module.description,
              duration: module.duration,
              prerequisites: module.prerequisites,
              content: module.content,
              exercises: {
                create: module.exercises,
              },
              resources: {
                create: module.resources,
              },
            })),
          },
        },
      });
      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create course." });
    }
  } else if (req.method === "GET") {
    const { searchQuery, category } = req.query;

    try {
      const courses = await prisma.course.findMany({
        where: {
          AND: [
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery as string, mode: "insensitive" } },
                    { description: { contains: searchQuery as string, mode: "insensitive" } },
                  ],
                }
              : {},
            category && category !== "All"
              ? { category: { equals: category as string } }
              : {},
          ],
        },
        include: {
          modules: {
            include: {
              exercises: true,
              resources: true,
            },
          },
        },
      });

      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch courses." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
