import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const validateRegistration = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("req.method", req.method);
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "validation.error.message" },
      { status: 402 }
    );

    // return res.status(405).json({ message: "Method not allowed" });
  }
  const validation = validateRegistration.safeParse(req.body);
  try {
    if (!validation.success) {
      console.log("not validated");
      return NextResponse.json(
        { error: validation.error.message.json },
        { status: 402 }
      );

      // return res.status(402).json({ error: validation.error.message });
    }
    return NextResponse.json(
      { error: "validation.error.message" },
      { status: 402 }
    );

    // return res.status(200).json({ message: "Hello from Next.js!" });
  } catch (err) {
    console.log("err", err);
    return res.status(200).json({ message: "Error " });
  }
}
