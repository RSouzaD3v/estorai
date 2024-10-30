import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Supondo que você tenha uma instância do Prisma configurada em "db"

export async function GET(req: NextRequest) {
    try {
        // Obtém o ID do usuário autenticado pelo Clerk
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
        }

        // Busca o crédito do usuário no banco de dados
        const user = await db.user.findFirst({
            where: { id: userId }, // Certifique-se de que o campo clerkUserId corresponde ao ID do Clerk
            select: { credits: true },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
        }

        // Retorna o crédito do usuário
        return NextResponse.json({ credit: user.credits });
    } catch (error) {
        console.error("Erro ao obter crédito do usuário:", error);
        return NextResponse.json({ error: "Erro ao obter crédito do usuário." }, { status: 500 });
    }
}
