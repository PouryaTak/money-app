import React from "react"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"

export default function GoogleAuth() {
    return (
        <div>
            <Button
                onClick={() => signIn("google")}
                className="w-full md:w-80 mx-auto flex items-center gap-3 mb-4 bg-blue-500 hover:bg-blue-600 text-white"
            >
                <svg
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    className="mb-1"
                >
                    <path
                        d="M16.045 6.558C16.1383 7.09496 16.1848 7.639 16.184 8.184C16.184 10.618 15.314 12.676 13.8 14.069H13.802C12.478 15.292 10.658 16 8.5 16C6.37827 16 4.34344 15.1571 2.84315 13.6569C1.34285 12.1566 0.5 10.1217 0.5 8C0.5 5.87827 1.34285 3.84344 2.84315 2.34315C4.34344 0.842856 6.37827 1.45839e-06 8.5 1.45839e-06C10.4859 -0.0232569 12.4038 0.722834 13.852 2.082L11.568 4.366C10.7424 3.57898 9.6405 3.14799 8.5 3.166C6.413 3.166 4.64 4.574 4.008 6.47C3.67291 7.46351 3.67291 8.5395 4.008 9.533H4.011C4.646 11.426 6.416 12.834 8.503 12.834C9.581 12.834 10.507 12.558 11.225 12.07H11.222C11.6389 11.7938 11.9955 11.436 12.2704 11.0182C12.5452 10.6004 12.7325 10.1312 12.821 9.639H8.5V6.559L16.045 6.558Z"
                        fill="currentColor"
                    />
                </svg>
                <span>Enter using Google</span>
            </Button>
        </div>
    )
}
