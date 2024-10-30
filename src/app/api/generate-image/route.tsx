import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { prompt } = data;
    const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN; // Certifique-se de definir sua variável de ambiente

    try {
        const response = await axios.post(
            "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
            {
                input: {
                    prompt: prompt
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json",
                    Prefer: "wait"
                }
            }
        );

        const output = response.data;
        console.log(output);
        return NextResponse.json({ response: output });
    } catch (error) {
        console.error("Erro na requisição:", error);
        return NextResponse.json({ error: "Erro ao processar a requisição." }, { status: 500 });
    }
}
