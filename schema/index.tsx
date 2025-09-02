import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  hospitalId: z.string().min(1, "Hospital ID is required"),
});
