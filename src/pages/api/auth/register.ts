import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string; body: { email: any; password: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          message: string;
          user?: {
            id: string;
            name: string | null;
            email: string;
            emailVerified: Date | null;
            image: string | null;
          };
        }): void;
        new (): any;
      };
    };
  }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "User already exists or error occurred" });
  }
}
