import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
} satisfies NextAuthConfig;