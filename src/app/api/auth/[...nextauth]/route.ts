import { handleAddUserToDB } from "@/functions/handle-add-user"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            if (account?.provider) {
                return await handleAddUserToDB(user)
            }
            return user
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
