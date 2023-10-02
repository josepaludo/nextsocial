import { prisma } from "@/prisma/db"
import { getUser } from "@/serverfunctions"
import { NextResponse } from "next/server"

type ChangeBioType = {
    bio: string
    id: number
}

export async function POST(req: Request) {
    const data = {success: false}
    const {bio, id} = await req.json() as ChangeBioType
    const user = await getUser()
    if (!user || user.id !== id) return NextResponse.json(data)
    const success = await prisma.user.update(
        { where: {id}, data: {bio} }
    )
    if (success) data.success = true
    return NextResponse.json(data)
}