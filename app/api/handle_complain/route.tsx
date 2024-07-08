import { NextRequest, NextResponse } from "next/server";

interface ComplainDetails {
  name: string,
  email: string,
  number: string,
  respondent: string,
  respondent_address: string,
  date_occurence: Date,
  address: string,
  complaint_type: string,
  complaint_details: string,
}

export async function POST(req: NextRequest) {
  console.log('nidagan');

  const { name, email, number,
    respondent, respondent_address, date_occurence,
    address, complaint_type, complaint_details
  }: ComplainDetails = await req.json();
  console.log(name);

  return NextResponse.json({ data: "Success" });
}
