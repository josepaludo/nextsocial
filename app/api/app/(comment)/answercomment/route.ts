import { prisma } from "@/prisma/db"
import { getUser } from "@/serverfunctions"
import { AnswerCommentRequestForm } from "@/types"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const data: {answerId: number|undefined} = { answerId: undefined }
    const {commentId, content} = await req.json() as AnswerCommentRequestForm
    const comment = await answerComment(commentId, content)
    if (comment) data.answerId = comment?.id
    // revalidatePath('/app/post/'+postId)
    return NextResponse.json(data)
}

async function answerComment(commentId: number, content: string) {
    const user = await getUser()
    if (!user) return null
    const comment = await getComment(commentId)
    if (!comment) return null 
    const answer = await prisma.comment.create({
        data: {
            content: content,
            commentId: comment.id,
            userId: user.id,
        }
    })
    return answer
}

async function getComment(commentId:number) {
    return prisma.comment.findUnique({
        where: { id: commentId }
    })
}