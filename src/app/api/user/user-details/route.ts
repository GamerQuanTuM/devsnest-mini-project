import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb"

export async function POST(req: NextRequest) {
    const { clerkId } = await req.json();

    try {
        if (!clerkId) {
            return NextResponse.json({ message: "User id is missing" }, { status: 404 })
        }
        const userDetails = await prismadb.user.findFirst({
            where: {
                externalId: clerkId
            },
            include: {
                categories: true
            }
        })
        return NextResponse.json({ message: userDetails }, { status: 200 })
    } catch (error) {
        NextResponse.json({ message: error }, { status: 500 })
    }
}