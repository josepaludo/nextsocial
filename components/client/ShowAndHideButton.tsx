"use client"

import { useState } from "react"

type Props = {
    children: React.ReactNode
    message: string
    height?: string
    mb?: boolean
}

export default function ShowAndHideButton(
    {children, message, height, mb}: Props 
) {

    const [isOpen, setIsOpen] = useState(false)
    const className = isOpen ? (height ? height : "h-48") : "h-0"

    return <>
        <div className="flex justify-end">
            <button
                className={"bg-slate-700 py-2 px-4 rounded-full text-white font-semibold mt-0 hover:bg-slate-300 hover:text-slate-900 "+(mb && "mb-3")}
                onClick={() => setIsOpen(oldValue => !oldValue)}
            >
                { isOpen ? "Hide" : message }
            </button>
        </div>
        <div
            className={"overflow-hidden "+className}
            style={{transition: "height 1s"}}
        >
            {children}
        </div>
    </>
}