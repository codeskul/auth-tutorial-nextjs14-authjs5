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



// ### With Prisma Addapter ###

import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db"
import authConfig from "@/auth.config"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})