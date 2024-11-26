import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma"; // You'll need to create this

export const authConfig = {
  providers: [],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/account", "/account/*", "/sell"];
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
