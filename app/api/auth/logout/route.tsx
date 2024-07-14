import { NextRequest, NextResponse } from "next/server";
import getSession from "../getSession/action";

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (session) {
    console.log(true);
    session.destroy();
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
