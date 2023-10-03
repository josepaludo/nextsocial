import { prisma } from "@/prisma/db"
import { getUser, isMember, removeMember } from "@/serverfunctions"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const data = {success: false}
    const user = await getUser()
    if (!user) return res(data)
    const {id} = await req.json()
    const member = await isMember(id, user.id)
    if (!member) return res(data)
    const success = await removeMember(id, user.id)
    if (success) data.success = true
    return res(data)
}

function res(data: {success: boolean}) {
    return NextResponse.json(data)
}