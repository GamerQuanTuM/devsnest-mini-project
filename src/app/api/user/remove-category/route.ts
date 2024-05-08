import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb"

export async function POST(req: NextRequest) {
    const { clerkId, categoryId } = await req.json()
    console.log(clerkId)
    try {
        const user = await prismadb.user.findUnique({
            where: {
                externalId: clerkId
            },
            include: {
                categories: true
            }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        await prismadb.user.update({
            where: {
                externalId: clerkId
            },
            data: {
                categories: {
                    disconnect: {
                        id: categoryId
                    }
                }
            }
        });
        return NextResponse.json({ message: "Category removed successfully" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}