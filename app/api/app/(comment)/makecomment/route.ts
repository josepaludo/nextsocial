import { makeComment } from "@/serverfunctions"
import { MakeCommentRequestForm, MakePostRequestForm } from "@/types"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const data = { success: false }
    const {postId, content} = await req.json() as MakeCommentRequestForm
    const comment = await makeComment(postId, content)
    if (comment) data.success = true
    // revalidatePath('/app/post/'+postId)
    return NextResponse.json(data)
}