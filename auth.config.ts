import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export default {
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
    },
    providers: [],
    callbacks: {
        authorized({ request }: any) {
            if (!request.cookies.get("sessionCartId")) {
                const sessionCartId = crypto.randomUUID();
                const newRequestHeaders = new Headers(request.headers);
                const response = NextResponse.next({
                    request: {
                        headers: newRequestHeaders,
                    },
                });
                response.cookies.set("sessionCartId", sessionCartId);
                return response;
            }
            return true;
        },
    },
} satisfies NextAuthConfig;
