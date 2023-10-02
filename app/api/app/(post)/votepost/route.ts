import { getUser, votePost } from "@/serverfunctions"
import { LikeValue } from "@/types"
import { NextResponse } from "next/server"

type ThumbsRequest = {
    postId: number
    likeValue: LikeValue
}

export async function POST(req: Request) {
    const data = {success: false}
    const {postId, likeValue } = await req.json() as ThumbsRequest
    const user = await getUser()
    if(!user) return data
    const like = await votePost(postId, likeValue, user.id)
    if (like) data.success = true
    return NextResponse.json(data)
}
