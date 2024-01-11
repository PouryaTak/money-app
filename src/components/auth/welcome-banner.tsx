import Image from "next/image"
import React from "react"
import Logo from "../../../public/logo-text.png"


export default function WelcomeBanner() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-5">
            <Image
                src={Logo}
                alt="app money logo"
                loading="lazy"
                className="mb-4"
                width={192}
                height={106}
                priority={false}
            />
        </div>
    )
}
