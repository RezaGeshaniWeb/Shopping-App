import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./lib/prisma";
import NextAuth from "next-auth";
import { compareSync } from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
            id: 'email-login',
            name: 'Email Login',
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
        }),

        CredentialsProvider({
            id: 'mobile-login',
            name: 'Mobile Login',
            credentials: {
                mobile: {
                    label: 'mobile',
                    type: 'text',
                }
            },
            async authorize(credentials) {
                if (credentials?.mobile === null) return null

                const user = await prisma.user.findUnique({
                    where: { mobile: credentials.mobile as string }
                })

                if (user) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                }

                return null
            }
        })
    ],
    callbacks: {
        async session({ session, token, user, trigger }: any) {
            session.user.id = token.sub;

            session.user.role = token.role

            if (trigger === "update") {
                session.user.name = user.name;
            }
            return session;
        },

        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role
            }
            return token
        },

        authorized({ request, auth }: any) {
            if (!request.cookies.get('sessionCartId')) {
                const sessionCartId = crypto.randomUUID()
                const newRequestHeaders = new Headers(request.headers)
                const response = NextResponse.next({
                    request: {
                        headers: newRequestHeaders
                    }
                })
                return response
            } else {
                return true
            }
        }
    }
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);