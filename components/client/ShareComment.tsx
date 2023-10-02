"use client"

import { useState } from "react"
import ShareIcon from "@/components/general/svg/ShareIcon"


export default function ShareComment(
    {commentId}: {commentId: number}
) {

    const [showWarning, setShowWarning] = useState(false)
    const opacity = showWarning ? "opacity-100" : "opacity-0"

    function handleClick() {
        const host = window.location.host
        const path = `/app/comment/${commentId}`
        navigator.clipboard.writeText(host+path)
        if (showWarning) return
        setShowWarning(true)
        setTimeout(() => setShowWarning(false), 1500)
    }

    return  <div className="relative">
        <button onClick={handleClick} className="flex items-center">
            <ShareIcon />
        </button>
        <span className={"ml-3 font-semibold transition-opacity duration-700 ease-in-out mt-2 sm:my-0 absolute bg-slate-100 border-2 border-slate-700 p-3 rounded bottom-5 left-2 " + opacity}>
            Link copied to clipboard
        </span>
    </div>
}
