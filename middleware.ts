import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'
import { TokenEnum } from "./types";


export async function middleware(req: NextRequest) {
    const token = req.cookies.get(TokenEnum.accessToken)?.value
    if (!token) return redirectToLogin(req)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        await jwtVerify(token, secret)
    } catch (error) {
        return redirectToLogin(req)
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/app/:path*',
        '/api/app/:path*'
    ]
}

function redirectToLogin(req: NextRequest) {
    return NextResponse.redirect(new URL('/login', req.url))
}

function redirectTo(req: NextRequest, url: string) {
    return NextResponse.redirect(new URL(url, req.url))
}