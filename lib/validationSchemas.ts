import { z } from "zod";

export const validateRegistration = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string({ message: "password is required" })
    .min(5, { message: "Password must be at least 5 characters long" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string({ message: "Last name is required" }).nonempty(),
});
