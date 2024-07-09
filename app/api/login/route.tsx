import { NextRequest, NextResponse } from "next/server";

interface loginData {
  email: string,
  password: string,
}
export async function POST(req: NextRequest) {

  const { email, password }: loginData = await req.json();

  try {
    const request = await fetch("http://localhost/git/ts-crime/app/php/login.php", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const response = await request.json();
    const { data: userData, error } = response;
    
    console.log(userData)
    console.log(error)

  } catch (err) {

  }
}