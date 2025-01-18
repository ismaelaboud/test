import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';  // Adjust import if necessary
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch users
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  } else if (req.method === 'POST') {
    // Create user
    try {
      const { fullName, email, password, userType, status, phoneNumber, department } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name: fullName,  // Use fullName here
          email,
          password: hashedPassword,
          status,
          phoneNumber,
          department,
          role: userType,  // Ensure role is being set
        },
      });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
