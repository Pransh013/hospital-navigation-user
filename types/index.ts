import { signinSchema } from "@/schema";
import { z } from "zod";

export type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "phone-pad";
};

export type SigninForm = z.infer<typeof signinSchema>;

export type TokenPayload = {
  patientId: string;
  firstName: string;
  email: string;
  hospitalId: string;
};

export type SigninResponse = {
  message: string;
  token: string;
  user: TokenPayload;
};

export type TestType = {
  testName: string;
  testStatus: "Completed" | "Pending";
  waitingTime: string | null;
  floorNumber: number;
  roomNumber: number;
  patientsInLine: number;
};
