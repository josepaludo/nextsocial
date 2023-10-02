import { prisma } from "@/prisma/db";
import { LoginRegisterRequestForm, LoginRegisterResponseData} from "@/types";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(req: Request) {
    const {username, email, password} = await req.json() as LoginRegisterRequestForm
    const data: LoginRegisterResponseData = { success: false }
    const user = await prisma.user.findUnique({where: {email: email}})
    if (user) return NextResponse.json(data)
    bcrypt.hash(password, 9, async function(err, hash) {
        await prisma.user.create({data: {
            name: username,
            email: email,
            password: hash,
        }})
    })
    data.success = true
    return NextResponse.json(data)
}
