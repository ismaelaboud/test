import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method === "POST") {
      const { title, description, thumbnailUrl, learningObjectives, prerequisites, level, modules }: CourseBody = req.body;

      if (!title || !description || !learningObjectives || !level) {
        return res.status(400).json({ error: "Missing required fields." });
      }

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

      return res.status(201).json(course);
    }

    if (method === "GET") {
      const { searchQuery, category } = req.query;

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

      return res.status(200).json(courses);
    }

    if (method === "PUT") {
      const { id, title, description, thumbnailUrl, learningObjectives, prerequisites, level, modules }: CourseBody & { id: number } = req.body;

      if (!id || !title || !description || !learningObjectives || !level) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const course = await prisma.course.update({
        where: { id },
        data: {
          title,
          description,
          thumbnailUrl,
          learningObjectives,
          prerequisites,
          level,
          modules: {
            deleteMany: {}, // Optional: Clear existing modules
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

      return res.status(200).json(course);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
    
      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Invalid or missing 'id' parameter." });
      }
    
      try {
        await prisma.course.delete({
          where: { id },
        });
        return res.status(204).end();
      } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ error: "Failed to delete course." });
      }
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
