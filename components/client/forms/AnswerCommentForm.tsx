"use client"

import SubmitButtonEnd from "@/components/general/SubmitButtonEnd"
import TextArea from "@/components/general/TextArea"
import { AnswerCommentRequestForm, MakeCommentRequestForm } from "@/types"
import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"


export default function AnswerCommentForm(
    {className, commentId}: {className?: string, commentId: number}
) {
    
    const router = useRouter()

    return (
        <form
            onSubmit={(e) => handleSubmit(e, commentId, router)}
            className={className + " "}
        >
            <TextArea name="content" className=" mt-3 " />
            <SubmitButtonEnd title="Answer" className="mt-3" />
        </form>
    )
}

function handleSubmit(
    e: FormEvent,
    commentId: number,
    router: AppRouterInstance
) {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    if (target.content.value === "") return
    const data: AnswerCommentRequestForm = {
        commentId: commentId,
        content: target.content.value
    }
    axios.post('/api/app/answercomment', data)
        .then( function(response) {
            const {answerId} = response.data as {answerId: number|undefined}
            target.content.value = ""
            console.log(answerId)
            if (answerId) router.push('/app/comment/'+answerId)
        }).catch( function(error) {
            console.log(error)
        })
}
