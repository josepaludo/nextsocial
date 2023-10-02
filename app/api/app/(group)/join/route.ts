import { prisma } from "@/prisma/db"
import { addMember, getUser, isBanned, isMember } from "@/serverfunctions"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const data = {success: false}
    const user = await getUser()
    if (!user) return res(data)
    const {id} = await req.json()
    const blocked = await isBanned(id, user.id)
    if (blocked) return res(data)
    const member = await isMember(id, user.id)
    if (member) return res(data)
    const success = await addMember(id, user.id)
    if (success) data.success = true
    return res(data)
}

function res(data: {success: boolean}) {
    return NextResponse.json(data)
}