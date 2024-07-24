import { object, string } from "zod";

export const complaintSchema = object({
  complainant: string(),
  respondent: string(),
  respondent_address: string(),
  date_occurrence: string().date(),
  place_occurrence: string(),
  complaint_type: string(),
  complaint_details: string(),
  resolution: string(),
});

export const formSchema = object({
  fname: string(),
  mname: string(),
  lname: string(),
  email: string().email(),
  number: string(),
  respondent: string(),
  respondent_address: string(),
  date_occurrence: string().date(),
  address: string(),
  complaint_type: string(),
  complaint_details: string(),
});

export const searchSchema = object({
  complainant: string(),
  respondent: string(),
  respondent_address: string(),
  date_occurrence: string().date(),
  address: string(),
  complaint_type: string(),
  complaint_details: string(),
  resolution: string(),
});
