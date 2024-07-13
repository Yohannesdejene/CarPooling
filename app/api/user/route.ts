import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
import prisma from "@/lib/prisma";
import {validateRegistration} from "@/lib/validationSchemas"

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("req.body", body)

  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "validation.error.message" },
      { status: 402 }
    );

    // return res.status(405).json({ message: "Method not allowed" });
  }
  const validation = validateRegistration.safeParse(body);
  try {
    if (!validation.success) {
      console.log("not validated");
      console.log("validation.error", validation.error.format());
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 402 }
      );
    }

    // By unique identifier
    const oldUser = await prisma.user.findUnique({
      where: {
        email: body?.email,
      },
    });

    if (oldUser) {
      return NextResponse.json(
        {
          message: "Email already exists try again later ",
        },

        { status: 409 }
      );
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
      },
    });
    return NextResponse.json(
      { message: "User registered successfully ", data: user },

      { status: 200 }
    );

    // return res.status(200).json({ message: "Hello from Next.js!" });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(
      { message: "Internal server error " },
      { status: 500 }
    );
  }
}
