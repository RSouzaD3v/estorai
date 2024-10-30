import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Supondo que você tenha uma instância do Prisma configurada em "db"

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        const data = await req.json();
        const { credit } = data; 

        if (!userId) {
            return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
        }

        const user = await db.user.findFirst({
            where: { id: userId }, // Certifique-se de que o campo id corresponde ao ID do Clerk
        });

        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
        }

        if (user.credits < credit) {
            return NextResponse.json({ error: "Créditos insuficientes." }, { status: 400 });
        }

        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                credits: user.credits - credit,
            },
        });

        return NextResponse.json({ message: "Créditos atualizados com sucesso.", credits: updatedUser.credits });
    } catch (error) {
        console.error("Erro ao atualizar crédito do usuário:", error);
        return NextResponse.json({ error: "Erro ao atualizar crédito do usuário." }, { status: 500 });
    }
}
