import { NextRequest, NextResponse } from "next/server";
import { useState } from "react"; // Import useState if managing state in a React component

interface ComplainDetails {
  complainant: string;
  email: string;
  number: string;
  respondent: string;
  respondent_address: string;
  date_occurrence: string;
  place_occurrence: string;
  complaint_type: string;
  complaint_details: string;
  resolution: string;
}

export async function POST(req: NextRequest) {
  try {
    const { data }: { data: ComplainDetails } = await req.json();

    console.log("Received data from frontend:", data);

    //! Send data to backend
    const response = await fetch(
      `${process.env.BE_URL}/ts-crime/app/php/comp.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    // Check if response is not OK
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    // Log backend response
    const responseData = await response.json();
    console.log("Response from PHP backend:", responseData);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Data sent successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error sending data to PHP backend:", error);

    const errorMessage = (error as Error).message;

    // Return error response
    return NextResponse.json({
      success: false,
      message: `Error sending data to PHP backend: ${errorMessage}`,
    });
  }
}
