import { z } from "zod";

export const signinSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email({ message: "Must be a valid email" }),
});
