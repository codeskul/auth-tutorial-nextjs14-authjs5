import { UserRole } from "@prisma/client";

import NextAuth, { type DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    } & DefaultSession["user"];
  }
}

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth: boolean;
  }
}
