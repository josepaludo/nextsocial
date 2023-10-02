import { banMember, getUser, isAdmin } from "@/serverfunctions"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const data = {success: false}
    const {groupId, userId} = await req.json()
    const user = await getUser()
    if (!user) return res(data)
    const admin = await isAdmin(groupId, user.id)
    if (!admin) return res(data)
    const blocked = await banMember(groupId, userId)
    if (blocked) data.success = true
    return res(data)
}

function res(data: {success: boolean}) {
    return NextResponse.json(data)
}