
import { prisma } from "@/prisma/db"
import { getUser, userFollowsUser } from "@/serverfunctions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = {success: false}
    const {id} = await req.json()
    const user = await getUser()
    if (!user) return res(data)
    const follows = await userFollowsUser({
        followerId: user.id,
        followingId: id,
    })
    if (!follows) return res(data)
    const success = await prisma.follower.delete({
        where: {followerId_followingId: {
            followerId: user.id,
            followingId: id,
        }}
    })
    if (success) data.success = true
    return res(data)
}

function res(data: {success: boolean}) {
    return NextResponse.json(data)
}