import { NextRequest, NextResponse } from "next/server";
interface ComplainDetails {
  fname: string;
  mname: string;
  lname: string;
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
    console.log(true)
    const data: ComplainDetails = await req.json();
    console.log(data);

    const request = await fetch(
      "http://localhost/git/ts-crime/app/php/complain.php",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await request.json();

    const { data:userData, error} = await response;
    if(userData) {
      console.log(true);
      return NextResponse.json({userData});
    }
    else if (error) {
      console.log(error)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } catch (err) {
    console.error(err);
  }
}
