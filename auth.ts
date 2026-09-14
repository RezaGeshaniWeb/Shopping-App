import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./lib/prisma";
import NextAuth from "next-auth";
import { compareSync } from "bcryptjs";

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                const user = await prisma.user.findFirst({
                    where: { email: credentials.email as string },
                })

                if (user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password)
                    if (isMatch) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }
                    }
                }

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, token, user, trigger }: any) {
            session.user.id = token.sub;
            if (trigger === "update") {
                session.user.name = user.name;
            }
            return session;
        }
    }
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);