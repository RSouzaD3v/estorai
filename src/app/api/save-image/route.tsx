import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { url } = data;

    // Verifica se a string contém base64
    if (url.startsWith("data:application/octet-stream;base64,")) {
        // Extrai a parte base64 da string
        const base64Image = url.split(",")[1];  // Pega a parte após a vírgula
        const fileName = "/estorai/" + Date.now() + ".webp";  // Supondo que você quer salvar como WebP
        const imageRef = ref(storage, fileName);

        try {
            const snapshot = await uploadString(imageRef, `data:image/webp;base64,${base64Image}`, 'data_url');
            console.log("File Upload Sucesso:", snapshot);

            const downloadUrl = await getDownloadURL(imageRef);
            console.log("URL de download gerada:", downloadUrl);

            return NextResponse.json({ imageUrl: downloadUrl });
        } catch (error) {
            console.error("Erro durante o upload:", error);
            return NextResponse.json({ error: "Erro ao fazer upload da imagem" });
        }
    } else {
        return NextResponse.json({ error: "URL inválida ou não contém base64." });
    }
}
