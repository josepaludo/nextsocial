import { makePost } from "@/serverfunctions"
import { MakePostRequestForm } from "@/types"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const data = { success: false }
    const { title, content, groupId } = await req.json() as MakePostRequestForm
    const post = await makePost({ title, content, groupId })
    if (post) console.log(post.content)
    if (post) data.success = true
    return NextResponse.json(data)
}