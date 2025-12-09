import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users", //table
  session: "sessions", //table
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const storeCookie = await cookies();
  storeCookie.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const storeCookie = await cookies();
  const sessionCookie = storeCookie.get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      storeCookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        storeCookie.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    }
  } catch {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  const storeCookie = await cookies();
  storeCookie.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
