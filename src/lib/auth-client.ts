import {createAuthClient} from 'better-auth/react'


export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL || "http://localhost:3000"
})

export const {signUp, signIn, signOut, useSession} = authClient