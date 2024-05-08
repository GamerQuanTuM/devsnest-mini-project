import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const perPage = parseInt(searchParams.get("perPage") || "6");

    const categoriesCount = await prismadb.category.count();
    const pageCount = Math.ceil(categoriesCount / perPage);

    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * perPage;
    const limit = perPage;

    const categories = await prismadb.category.findMany({
        skip: offset,
        take: limit,
    });

    return NextResponse.json({ message: categories, pageCount }, { status: 200 });
}

