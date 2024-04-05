import { UserRole } from "@prisma/client"

import NextAuth, { type DefaultSession } from "next-auth"
declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole
            isTwoFactorEnabled: boolean
        } & DefaultSession["user"]
    }
}

import { JWT } from "next-auth/jwt"
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        role?: UserRole
    }
}