"use client"

import { useState } from "react"
import CommentForm from "./forms/MakeCommentForm"


export default function ShowCommentForm(
    {postId}: {postId: number}
) {

    const [isOpen, setIsOpen] = useState(false)
    const className = isOpen ? "h-48" : "h-0"

    return <>
        <div className="flex justify-end">
            <button
                className="bg-slate-700 py-2 px-4 rounded-full text-white font-semibold mb-3 mt-0 hover:bg-slate-300 hover:text-slate-900"
                onClick={() => setIsOpen(oldValue => !oldValue)}
            >
                { isOpen ? "Hide" : "Make a comment" }
            </button>
        </div>
        <div
            className={"overflow-hidden "+className}
            style={{transition: "height 1s"}}
        >
            <CommentForm postId={postId} />
        </div>
    </>
}