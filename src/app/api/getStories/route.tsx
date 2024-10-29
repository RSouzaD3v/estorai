import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);

    console.log("Servidor: ", userId);

    try {
        const stories = await db.storyData.findMany({
            where: {
                createdBy: userId?.toString()
            }
        })

        if (!stories) {
            return NextResponse.json({ error: 'História não encontrada' }, { status: 404 });
        }

        return NextResponse.json({stories: stories}, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Erro ao buscar a história'+e }, { status: 500 });
    }
}
