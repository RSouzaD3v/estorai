import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch"; // Certifique-se de que "node-fetch" está instalado

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { url } = data;

    if (url && url.startsWith("https://")) {
        try {
            // Baixa a imagem da URL
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao baixar a imagem. Status: ${response.status}`);
            }
            console.log("Imagem baixada com sucesso.");

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Converte o buffer para base64
            const base64Image = buffer.toString("base64");
            if (!base64Image) {
                throw new Error("Erro: base64Image está indefinido após a conversão.");
            }

            const fileName = "estorai/" + Date.now() + ".webp";
            const imageRef = ref(storage, fileName);

            // Upload do base64 para o Firebase
            const snapshot = await uploadString(imageRef, `data:image/webp;base64,${base64Image}`, 'data_url');
            console.log("File upload bem-sucedido:", snapshot);

            // Obtém a URL de download
            const downloadUrl = await getDownloadURL(imageRef);
            console.log("URL de download gerada:", downloadUrl);

            return NextResponse.json({ imageUrl: downloadUrl });
        } catch (e) {
            console.error("Erro durante o processo:", e);
            return NextResponse.json({ error: `Erro ao processar a imagem a partir da URL: ${e}` });
        }
    } else {
        console.error("URL inválida fornecida:", url);
        return NextResponse.json({ error: "URL inválida. Esperado uma URL direta com 'https://'." });
    }
}
