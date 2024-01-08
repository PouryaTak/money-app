"use client"
import React from "react"
import { useSession, signOut, signIn } from "next-auth/react"
import { Button } from "../ui/button"
import Image from "next/image"

function UserAuth() {
    const { status, data: session } = useSession()
    return (
        <div className="bg-gray-100 rounded-lg p-4 mb-10 flex justify-between items-center">
            {status === "authenticated" && (
                <div className="flex items-center gap-4">
                    <Image
                        src={session?.user?.image!}
                        width={50}
                        height={50}
                        className="rounded-full border-gray-500"
                        alt="user image"
                    ></Image>
                    <div>
                        <p className="text-sm text-gray-500">Logged in as</p>
                        <p className="text-sm font-medium">{session?.user?.email}</p>
                    </div>
                </div>
            )}
            <Button
                variant="destructive"
                size="sm"
                onClick={() => (status === "authenticated" ? signOut() : signIn("google"))}
            >
                {status === "authenticated" ? "Log out" : "Log in"}
            </Button>
        </div>
    )
}

export default UserAuth
