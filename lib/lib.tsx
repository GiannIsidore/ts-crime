import { SessionOptions } from 'iron-session';

export interface SessionData {
  user_id?: number,
  user_fname?: string,
  user_lname?: string,
  user_email?: string,
  user_role?: number;
  isLogged_in?: boolean
}

export const defaultSession: SessionData = {
  isLogged_in: false
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }

}