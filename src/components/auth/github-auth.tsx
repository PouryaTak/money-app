import React from "react"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { Github } from "lucide-react"

export default function GithubAuth() {
    return (
        <div>
            <Button
                onClick={() => signIn("github")}
                className="w-full md:w-80 mx-auto flex items-center gap-3 mb-4 bg-gray-800 hover:bg-gray-700 text-white"
            >
                <Github className="w-5" />
                <span>Enter using GitHub</span>
            </Button>
        </div>
    )
}
