import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/api/auth/getSession/action";

export async function middleware(req: NextRequest){

  const session = await getSession();

  // console.log("session", session.isLogged_in);
  const { pathname } = req.nextUrl;

  if (pathname === '/' || pathname === '') {
    if (session.isLogged_in) {

      if(session.user_role == 1) {
        return NextResponse.redirect(new URL('/admin_dashboard', req.url))
      }
      else if (session.user_role == 0) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      else{
        return null;
      }
    }
  }

  if (pathname === '/dashboard') {
    const result = !session.isLogged_in ? NextResponse.redirect(new URL('/', req.url)) : null;
    return result;
  }
  
  if (pathname === '/admin_dashboard') {
    const result = session.user_role == 0 ? NextResponse.redirect(new URL ('/dashboard', req.url)) : null;
    return result;
  }
}

export const config = {
  matcher: ['/', '/dashboard', '/admin_dashboard', '/dashboard/:path*', '/admin_dashboard/:path:']
}