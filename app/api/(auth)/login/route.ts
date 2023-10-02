import { prisma } from "@/prisma/db"
import { LoginRegisterRequestForm, LoginRegisterResponseData, TokenEnum } from "@/types"
import { NextResponse } from "next/server"
import {cookies} from "next/headers"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export async function POST(req: Request) {
    const data: LoginRegisterResponseData = { success: false }
    const { username, email, password} =  await req.json() as LoginRegisterRequestForm 
    const user = await prisma.user.findUnique({where: {email: email}})
    if (!user || user.name !== username) return NextResponse.json(data)
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
        data.success = true
        setAccessToken(username, email)
    }
    return NextResponse.json(data)
}

function setAccessToken(username: string, email: string): void {
    const token = jwt.sign(
        {
            name: username,
            email: email,
            expireDate: oneMonthFromToday(),
        },
        process.env.JWT_SECRET!
    )
    cookies().set({
        name: TokenEnum.accessToken,
        value: token,
        path: '/',
        sameSite: "strict",
    })
}

function oneMonthFromToday() {
    const oneMontInMilliseconds = 2592000000 // 1000 * 60 * 60 * 24 * 30
    const today = new Date().getTime()
    return new Date(today + oneMontInMilliseconds)
}