'use client'
//provide authentication session information to components within its scope
import { SessionProvider } from "next-auth/react"

export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        //The components nested inside this provider will have access to authentication session information
        <SessionProvider>
            <>
                {children}
            </>
        </SessionProvider>
    )
}
//NextAuthProvider is a component that utilizes the SessionProvider to provide authentication session information to its child components