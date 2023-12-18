import Image from "next/image"
import React, { useRef } from "react"

function getRandomCardPosition(containerWidth, containerHeight, cardWidth, cardHeight) {
    const maxX = containerWidth - cardWidth
    const maxY = containerHeight - cardHeight

    const randomX = Math.floor(Math.random() * (maxX + 1))
    const randomY = Math.floor(Math.random() * (maxY + 1))

    // Return the random position
    return { x: randomX, y: randomY }
}

const Card = () => {
    const [pos, setPos] = React.useState({ x: 0, y: 0 })
    React.useEffect(() => {
      const container = document.getElementById("container")
      
      const { clientWidth, clientHeight } = container
        const timeInterval = setInterval(() => {
            const { x, y } = getRandomCardPosition(
                clientWidth,
                clientHeight,
                250,
                48
            )
            setPos({ x, y })
        }, 5000)

        return () => clearInterval(timeInterval)
    }, [])
    return (
        <div
            className="w-[250px] h-12 bg-white rounded-md shadow-lg"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        ></div>
    )
}

const CardRenderer = () => {

    return (
        <div className="bg-slate-200 w-full h-full p-2 rounded-xl relative" id="container">
          {<Card />}
        </div>
    )
}

export default function WelcomeBanner() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-5">
            <Image
                src="/logo-text.png"
                alt="app money logo"
                loading="lazy"
                className="mb-4"
                width={192}
                height={106}
                priority={false}
            />
            <CardRenderer />
        </div>
    )
}
