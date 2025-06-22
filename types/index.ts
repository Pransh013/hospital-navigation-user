import { signinSchema } from "@/schema";
import { z } from "zod";

export type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "phone-pad";
};

export type SigninForm = z.infer<typeof signinSchema>