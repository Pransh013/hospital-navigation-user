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

export type TestStatus = "assigned" | "test_completed" | "cancelled";

export type TestType = {
  patientTestId: string;
  testName: string;
  testStatus: string;
  floorNumber: number;
  roomNumber: string;
  duration: number;
  patientsInLine: number;
};

export type ConsultationSummary = {
  doctorName: string;
  doctorDesignation: string;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
  consultationRequired?: boolean;
};
