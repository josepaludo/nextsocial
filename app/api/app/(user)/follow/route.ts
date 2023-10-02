import { prisma } from "@/prisma/db"
import { getUser } from "@/serverfunctions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = {success: false}
    const {id} = await req.json()
    const user = await getUser()
    if (!user) return res(data)
    const existent = await prisma.follower.findUnique({
        where: {followerId_followingId: {
            followerId: user.id,
            followingId: id
        }}
    })
    if (existent) return res(data)
    const follow = await prisma.follower.create({
        data: {followerId: user.id, followingId: id}
    })
    if (follow) data.success = true
    return res(data)
}

function res(data: {success: boolean}) {
    return NextResponse.json(data)
}