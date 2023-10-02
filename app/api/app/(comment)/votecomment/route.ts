import { prisma } from "@/prisma/db"
import { getUser } from "@/serverfunctions"
import { LikeValue } from "@/types"
import { NextResponse } from "next/server"

type ThumbsRequest = {
    commentId: number
    likeValue: LikeValue
}

export async function POST(req: Request) {
    const data = { success: false }
    const { commentId, likeValue } = await req.json() as ThumbsRequest
    const user = await getUser()
    if(!user) return NextResponse.json(data)
    const like = await voteComment(commentId, likeValue, user.id)
    if (like) data.success = true
    return NextResponse.json(data)
}

export async function voteComment(
    commentId: number, value: LikeValue, userId: number
) {
    const userLike = await prisma.commentLike.findUnique({
        where: { commentId_userId : { commentId, userId } },
        select: { value: true }
    }) 
    let newValue = value
    if (userLike) {
        switch (value) {
            case LikeValue.Up:
                newValue = userLike.value === LikeValue.Up ?
                    LikeValue.Null : LikeValue.Up
                break
            case LikeValue.Down:
                newValue = userLike.value === LikeValue.Down ?
                    LikeValue.Null : LikeValue.Down
                break
        }
    }
    if (newValue === LikeValue.Null) {
        await prisma.commentLike.delete({
            where: { commentId_userId : { commentId, userId } }
        })
        return LikeValue.Null

    }
    const like = await commentVoteUpsert(commentId, newValue, userId)
    return like
}

export async function commentVoteUpsert(
    commentId: number, value: LikeValue, userId: number
) {
    const like = await prisma.commentLike.upsert({
        where: { commentId_userId : { commentId, userId } },
        update: {
            value: value
        },
        create: { commentId, userId, value }
    })
    return like.value as LikeValue
}