import { handleAddUserToDB } from "@/functions/handle-add-user"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            if (account?.provider === "google") {
                return await handleAddUserToDB(user)
            }
            return user
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
