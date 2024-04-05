// ### With Prisma Addapter ###

import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // pages: {
  //     signIn: "/auth/login",
  //     error: "/auth/error"
  // },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      // Prevent Sign in without email verification
      if (!existingUser?.emailVerified) return false;

      // 2FA
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in process
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ token, session }) {
      console.log({ sessionToken: token });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

// ### Without Prisma Adapter ###
// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { loginSchema } from "@/schemas"

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut
// } = NextAuth({
//     providers: [CredentialsProvider({
//         async authorize(credentials) {
//             const validatedFields = loginSchema.safeParse(credentials)

//             if (validatedFields.success) {
//                 const { email, password } = validatedFields.data

//                 if (email == "test@gmail.com" && password == "123456") {
//                     return { email: "test@example", id: "123456" }
//                 } else {
//                     return null
//                 }
//             }

//             return null
//         }
//     })],
//     session: { strategy: "jwt" }
// })
