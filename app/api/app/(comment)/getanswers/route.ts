import { prisma } from "@/prisma/db";
import { GetAnswersType } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const data = { success: true}
    const {searchParams} = new URL(request.url)
    return NextResponse.json(data)
}

export async function POST(request: Request) {
    const data: GetAnswersType = { success: false, commentAnswers: [] }
    const { ids } = await request.json() as { ids: number[] }
    const comments = await getComments(ids)
    if (!comments) return res(data)
    data.commentAnswers = comments
    data.success = true
    return res(data)
}

function res(data: GetAnswersType) {
    return NextResponse.json(data)
}

async function getComments(ids: number[]) {
    return await prisma.comment.findMany({
        where: {
            id: {
                in: ids
            }
        },
        include: {
            comments: { select: {
                id: true }
            },
            user: { select: {
                name: true,
                id: true,
            }},
            likes: { select: {
                userId: true,
                value: true
            }}
        }
    })
}