import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';
import NextAuth from "next-auth"

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

// ### Without Prisma Adapter
// import { auth } from "@/auth"

// ### With Prisma Adapter ###
import authConfig from "@/auth.config"
const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // console.log("ROUTE: ", nextUrl.pathname)
    // console.log("IS LOGGEDIN: ", isLoggedIn)

    if (nextUrl.pathname == '/welcome') {
        const greeting = await get('greeting');
        // NextResponse.json requires at least Next v13.1 or
        // enabling experimental.allowMiddlewareResponseBody in next.config.js
        return NextResponse.json(greeting);
    }

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}