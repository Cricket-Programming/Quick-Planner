import NextAuth from "next-auth"; // auth.ts must be in the my-app directory because the dependency is only defined in that folder
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"; // gets the prisma adapter package
import { prisma } from "@/lib/prisma";

const isDev = process.env.NODE_ENV !== "production";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    debug: isDev,
});