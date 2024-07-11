import { NextRequest, NextResponse } from "next/server";

interface ComplainDetails {
  fname: string;
  mname: string;
  lname: string;
  email: string;
  number: string;
  respondent: string;
  respondent_address: string;
  date_occurrence: string;
  address: string;
  complaint_type: string;
  complaint_details: string;
}

export async function POST(req: NextRequest) {
  try {
    const { data }: { data: ComplainDetails } = await req.json();

    console.log("Received data from frontend:", data);

    //! Send data to  backend
    const response = await fetch(
      "http://localhost/3rdYear/ts-crime/app/php/comp.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    //? Check if  response  not OK
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    //! Log backend response
    const responseData = await response.json();
    console.log("Response from PHP backend:", responseData);

    return NextResponse.json({
      success: true,
      message: "Data sent successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error sending data to PHP backend:", error);

    const errorMessage = (error as Error).message;

    return NextResponse.json({
      success: false,
      message: `Error sending data to PHP backend: ${errorMessage}`,
    });
  }
}
