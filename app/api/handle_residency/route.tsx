import { NextRequest, NextResponse } from "next/server";

// Define the type for the form data
interface ResidencyFormData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  email?: string;
  phone: string;
  address: string;
  is_resident: "0" | "1";
}

export async function POST(request: NextRequest) {
  try {
    console.log("Received request:", request);

    const data = await request.json();
    console.log("Parsed data:", data);

    if (!data || !data.data) {
      console.error("Missing 'data' key in JSON payload");
      return NextResponse.json(
        { success: false, message: "Missing 'data' key in JSON payload" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.BE_URL}/ts-crime/app/php/handle_residency.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log("Response from PHP backend:", response);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error from PHP backend:", errorMessage);
      return NextResponse.json(
        { success: false, message: `Error from PHP backend: ${errorMessage}` },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    console.log("Response data from PHP backend:", responseData);

    if (!responseData.success) {
      console.log("PHP backend response indicates failure:", responseData);
      return NextResponse.json(responseData, { status: 400 });
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("Error occurred during processing:", error);
    return NextResponse.json(
      { success: false, message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
