import { getUser } from "@/serverfunctions"
import { TokenEnum } from "@/types"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const data = {success: false}
    const user = await getUser()
    if (!user) return res(data)
    cookies().delete(TokenEnum.accessToken)
    data.success = true
    return res(data)
}

function res(data: {success: boolean}) {
    return NextResponse.json(data)
}