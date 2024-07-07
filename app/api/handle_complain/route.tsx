import { NextRequest, NextResponse } from "next/server";

interface ComplainDetails {
  name: string;
}

export async function POST(req: NextRequest) {
  console.log('nidagan');

  const { name }: ComplainDetails = await req.json();
  console.log(name);

  return NextResponse.json({ data: "Success" });
}
