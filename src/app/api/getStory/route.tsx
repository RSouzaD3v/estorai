// app/api/getStory/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    console.log("Servidor: ", id);

    if (!id) {
        return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }

    try {
        const story = await db.storyData.findFirst({
            where: {
                storyId: id,
                createdBy: userId?.toString()
            },
        });

        if (!story) {
            return NextResponse.json({ error: 'História não encontrada' }, { status: 404 });
        }

        return NextResponse.json({data: story}, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Erro ao buscar a história'+e }, { status: 500 });
    }
}
