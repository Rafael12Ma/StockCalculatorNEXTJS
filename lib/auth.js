import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_BASE_URL,
    process.env.NEXT_PUBLIC_BASE_URL?.replace("https://", "http://")
  ],
  session: {
    expiresIn: 10 * 60,
    updateAge: 0,
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60
    }
  },
  advanced: {
    cookiePrefix: "StockCalculator",
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookies: {
      session_token: {
        name: "StockCalculator_session_token",
        attributes: {
          sameSite: "lax"
        }
      }
    }
  },
  plugins: [nextCookies()]
});


