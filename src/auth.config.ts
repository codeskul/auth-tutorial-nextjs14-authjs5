import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"

import { loginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOD_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if (passwordMatch) {
                        return user
                    }
                }

                return null
            }
        })],
} satisfies NextAuthConfig