import { NextRequest, NextResponse } from "next/server";
interface ComplainDetails {
  name: string;
  email: string;
  number: string;
  respondent: string;
  respondent_address: string;
  date_occurence: string;
  address: string;
  complaint_type: string;
  complaint_details: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: ComplainDetails = await req.json();
    console.log(data);

    const request = await fetch(
      "http://localhost/3rdYear/ts-crime/app/php/complain.php",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  } catch (error) {
    console.error(error);
  }
}
