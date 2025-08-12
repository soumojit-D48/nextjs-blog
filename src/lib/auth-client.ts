import {createAuthClient} from 'better-auth/react'


export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL || "http://localhost:3000"
})

export const {signUp, signIn, signOut, useSession} = authClient
// useSession -> React hook to get the current logged-in user’s session.