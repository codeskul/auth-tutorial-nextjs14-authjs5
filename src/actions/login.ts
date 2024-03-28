"use server"
import *  as z from "zod"
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { loginSchema } from "@/schemas"

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        console.log("Login Action Error ::", error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error
    }
}

export const oauthSignIn = async (provider: "google" | "github") => {
    await signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
}