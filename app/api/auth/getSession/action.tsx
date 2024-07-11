import { defaultSession, SessionData, sessionOptions } from "@/lib/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLogged_in) {
    session.isLogged_in = defaultSession.isLogged_in;
  }

  return session;
};

export default getSession;
