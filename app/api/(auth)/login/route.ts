import { prisma } from "@/prisma/db"
import { LoginRegisterRequestForm, LoginRegisterResponseData, LoginResponseType, TokenEnum } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
    const data: LoginResponseType = { token : undefined }
    const { username, email, password} =  await req.json() as LoginRegisterRequestForm 
    const user = await prisma.user.findUnique({where: {email: email}})
    if (!user || user.name !== username) return NextResponse.json(data)
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return NextResponse.json(data)
    const token = getAccessToken(username, email)
    data.token = token
    return NextResponse.json(data)
}

function getAccessToken(username: string, email: string) {
    const token = jwt.sign(
        {
            name: username,
            email: email,
            expireDate: oneMonthFromToday(),
        },
        process.env.JWT_SECRET!
    )
    return token
}

function oneMonthFromToday() {
    const oneMontInMilliseconds = 2592000000 // 1000 * 60 * 60 * 24 * 30
    const today = new Date().getTime()
    return new Date(today + oneMontInMilliseconds)
}