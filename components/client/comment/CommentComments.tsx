"use client"

import ContainerWithSideLine from "@/components/general/ContainerWithSideLine"
import { CommentWithUserType, GetAnswersType } from "@/types"
import { User } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import ClientComment from "./ClientComment"

type CommentCommentsType = {
    comments: {id: number}[]
    currentUser: User|null
    className?: string
}


export default function CommentComments(
    {comments, currentUser}: CommentCommentsType
) {

    const ids = comments.map(comment => comment.id)
    const [answers, setAnswers] = useState<CommentWithUserType[]|null>(null)

    useEffect(() => {
        axios.post('/api/app/getanswers', {ids: ids})
            .then(function (response) {
                const {success, commentAnswers} = response.data as GetAnswersType
                if (!success) return
                setAnswers(commentAnswers)
            }).catch(function (error) { console.log(error) })
        // eslint-disable-next-line
    }, [])

    return <>
        <ContainerWithSideLine>
            { answers ?
                answers.length > 0 ?
                    answers.map((comment, key) => (
                        <ClientComment
                            key={key}
                            comment={comment}
                            currentUser={currentUser}
                        />
                    ))
                :
                    <Sign message="No answers yet." />
            :
                <Sign message="Loading..." />
            }

        </ContainerWithSideLine>
    </>
}

function Sign(
    {message}: {message: string}
) {
    return <>
        <h1 className="m-10 text-lg font-light">
            {message}
        </h1>
    </>

}
            // { comments.length === 0 ?
            //     <p>No answers</p>
            // :
            //     comments.map((comment, key) => (
            //         <div key={key} >
            //             {comment.id}
            //         </div>
            //     ))
            // }