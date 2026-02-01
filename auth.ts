import NextAuth from 'next-auth'; // auth.ts must be in the my-app directory because the dependency is only defined in that folder
import GitHub from 'next-auth/providers/github'
import {PrismaAdapter} from "@auth/prisma-adapter"; // gets the prisma adapter package
import { prisma } from "@/lib/prisma";

export const {  auth, handlers, signIn, signOut } = NextAuth({
    providers: [GitHub],   
    adapter: PrismaAdapter(prisma)
});