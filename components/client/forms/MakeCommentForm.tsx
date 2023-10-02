"use client"

import SubmitButtonEnd from "@/components/general/SubmitButtonEnd"
import TextArea from "@/components/general/TextArea"
import { MakeCommentRequestForm } from "@/types"
import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"


export default function CommentForm(
    {className, postId}: {className?: string, postId: number}
) {
    
    const router = useRouter()

    return (
        <form
            onSubmit={(e) => handleSubmit(e, postId, router)}
            className={className + " "}
        >
            <TextArea name="content" />
            <SubmitButtonEnd title="Comment" className=" mt-3 " />
        </form>
    )
}

function handleSubmit(e: FormEvent, postId: number, router: AppRouterInstance) {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    if (target.content.value === "") return
    const data: MakeCommentRequestForm = {
        postId: postId,
        content: target.content.value
    }
    axios.post('/api/app/makecomment', data)
        .then( function(response) {
            const {success} = response.data as {success: boolean}
            target.content.value = ""
            if (success) router.refresh()
        }).catch( function(error) {
            console.log(error)
        })
}

            // <textarea name="content" className="" />
            // <button type="submit" className={submitButtonClass}>Comment</button>