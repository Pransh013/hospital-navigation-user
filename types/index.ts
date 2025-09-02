import { signinSchema } from "@/schema";
import { z } from "zod";

export type SigninForm = z.infer<typeof signinSchema>;

export type TokenPayload = {
  id: string;
  hospitalId: string;
};

export type Patient = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type SigninResponse = {
  message: string;
  status: number;
  data: {
    token: string;
    patient: Patient;
  };
};

export type AuthState = {
  token: string | null;
  patient: Patient | null;
  isSignedIn: boolean;
  isHydrating: boolean;
  signin: (token: string, patient: Patient) => void;
  signout: () => void;
};

export type Hospital = {
  id: string;
  name: string;
};

export type HospitalResponse = {
  message: string;
  status: number;
  data: Hospital[];
};

export type TestStatus =
  | "SCHEDULED"
  | "IN_QUEUE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type TestDetails = {
  id: string;
  name: string;
  roomNumber: string;
  floor: string;
  category: string;
  durationInMins: number;
};

export type TestBooking = {
  id: string;
  status: TestStatus;
  scheduledAt: string;
  checkInAt: string | null;
  test: TestDetails;
};

export type TestBookingResponse = {
  message: string;
  status: number;
  data: TestBooking[];
};

export type ConsultationSummary = {
  doctorName: string;
  doctorDesignation: string;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
  consultationRequired?: boolean;
};
