import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server"; // Função para autenticação em rotas de servidor
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req); // Obtém o ID do usuário autenticado

    if (!userId) {
        return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
    }

    const data = await req.json();
    const { credit } = data;

    const convertCreditNumber = parseInt(credit);

    const userDetailGet = await db.user.findFirst({
        where: {
            id: userId,
        },
    });

    if (userDetailGet?.credits != null) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                credits: userDetailGet.credits - convertCreditNumber,
            },
        });
    }

    return NextResponse.json({ message: "Créditos atualizado com sucesso", credits: userDetailGet?.credits });
}

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req); // Obtém o ID do usuário autenticado

    if (!userId) {
        return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
    }

    const userDetailGet = await db.user.findFirst({
        where: {
            id: userId,
        },
    });

    const credits = userDetailGet?.credits;

    return NextResponse.json({ message: "Dados retornados", credits });
}
