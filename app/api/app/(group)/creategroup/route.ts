import { prisma } from "@/prisma/db"
import { addAdmin, addMember, getGroup, getUser } from "@/serverfunctions"
import { CreateGroupResponseType } from "@/types"
import { NextResponse } from "next/server"

type CreateGroupForm = {
    name: string
    description: string
}


export async function POST(req: Request) {
    const data = {
        groupId: undefined,
        existingGroupId: undefined
    } as CreateGroupResponseType
    const {name, description} = await req.json() as CreateGroupForm
    const existingGroup = await getGroup(name)
    if (existingGroup) {
        data.existingGroupId = existingGroup.id
        return NextResponse.json(data)
    }
    const group = await createGroup({name, description})
    if (group) data.groupId = group.id
    return NextResponse.json(data)
}

async function createGroup(
    {name, description}: CreateGroupForm
) {
    const user = await getUser()
    if (!user) return
    const group = await prisma.group.create({
        data: { name, description }
    })
    await addAdmin(group.id, user.id)
    await addMember(group.id, user.id)
    return group
}

