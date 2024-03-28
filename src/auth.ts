// ### With Prisma Addapter ###

import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
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
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        // async signIn({ user }) {
        //     console.log({ signInuser: user })
        //     const existingUser = await getUserById(user.id as string)

        //     if (!existingUser || !existingUser.emailVerified) {
        //         return false
        //     }

        //     return true
        // },
        async session({ token, session }) {
            console.log({ sessionToken: token })

            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role

            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})


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