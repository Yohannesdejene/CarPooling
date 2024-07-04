import { NextApiRequest, NextApiResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validateRegistration = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const validation = validateRegistration.safeParse(req.body);

  if (!validation.success) {
    console.log("not validated");

    return res.status(402).json({ error: validation.error.message });
  }

  return res.status(200).json({ message: "Hello from Next.js!" });
}
