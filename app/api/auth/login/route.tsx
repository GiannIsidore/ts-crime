import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import getSession from "../getSession/action";
import { z } from "zod";

interface loginData {
  email: string;
  password: string;
}

interface Credentials {
  employee_id: number;
  employee_fname: string;
  employee_lname: string;
  employee_email: string;
  employee_role: number;
}

interface Message {
  message: string;
}

interface ApiResponse {
  data: Credentials;
  error: Message;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  const { email, password }: loginData = await req.json();
  console.log(true)

  try {
    const request = await fetch(
      `${process.env.BE_URL}/ts-crime/app/php/login.php`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const response: ApiResponse = await request.json();
    const { data: userData, error } = response;

    if (userData) {
      session.user_id = userData.employee_id;
      session.user_fname = userData.employee_fname;
      session.user_lname = userData.employee_lname;
      session.user_email = userData.employee_email;
      session.user_role = userData.employee_role;
      session.isLogged_in = userData ? true : false;

      await session.save();
      // return NextResponse.redirect(new URL('/dashboard', request.url))
      return NextResponse.json({ message: "Login Successful" });
    } else if (error) {
      return NextResponse.json({ error });
    }
  } catch (err) {}
}
