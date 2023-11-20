import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prismadb"
//Specifying the configuration for authentication
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    //Configures authentication providers
    providers: [

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })

    ],
    //Configures custom pages for authentication
    pages: {
        signIn: "/sign-in",
    },
    //securing the authentication process
    secret: process.env.NEXTAUTH_SECRET,

}
//handler represents the authentication endpoint
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }