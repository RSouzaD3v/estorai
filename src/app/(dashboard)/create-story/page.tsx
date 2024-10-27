"use client";

import { useState } from "react";
import TypeStoryBook from "@/app/(dashboard)/create-story/_components/TypeStoryBook";
import { Container } from "@/app/_components/Container";
import BoyImage from '../../../../public/flyeind-boy.jpg';
import Header from "@/app/_components/Header";
import { chatSession } from "@/config/GeminiAi";

const CreateStory = () => {
    const [typeBook, setTypeBook] = useState<string>("Random");
    const [content, setContent] = useState<string>("story of boy and Magic school");
    const [loading, setLoading] = useState<boolean>(false);

    const tiposLivros = [
        { id: 1, tipo: "Comédia", image: BoyImage },
        { id: 2, tipo: "Drama", image: BoyImage },
        { id: 3, tipo: "Aventura", image: BoyImage },
        { id: 4, tipo: "Aleátorio", image: BoyImage },
    ];

    const CreateStory = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const promptFinal = `create Kids story on description for 5-8 years Kids, language: pt-br,${typeBook} story, 
        and all imagens in paper cut style: ${content}, give me 5 chapter, With detailed image text promt 
        for each of chapter and image prompt for story cover book with story name, all in Json field format`;

        try{
            const result = await chatSession.sendMessage(promptFinal);
            console.log(result?.response.text());
            saveStory(result.response.text());
            setLoading(false);
        }catch(e){
            console.log(e);
            setLoading(false);
        }
    }

    const saveStory = async (output: string, 
        subject: string = "manual", 
        type: string = "manual", ageGroup: string = "05-08", imageStyle: string = "Cut paper") => {
        try {
            const response = await fetch("/api/saveStory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify({ story: output, subject, type, ageGroup, imageStyle }), // Envia o conteúdo da história
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao salvar a história: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("História salva com sucesso:", data);
        } catch (e) {
            console.error("Erro ao salvar a história:", e);
        }
    };
    

    return (
        <div className="text-white flex items-center justify-center h-full bg-black">
            <Container className="bg-black h-full p-2">
                <Header logado={true} />
                <h1 className="text-center text-3xl font-bold md:text-6xl my-5">Create Story</h1>

                <div className="bg-black">
                    <form>
                        <div className="flex items-center flex-wrap justify-between">
                            <div>
                                <h1 className="md:text-xl text-violet-200 font-bold">Conteúdo da história:</h1>
                                <textarea
                                    onChange={(e) => setContent(e.target.value)}
                                    name="content"
                                    className="w-[450px] h-[150px] rounded-lg p-5 shadow-none outline-none resize-none
                                    placeholder-gray-500 text-[#323232] font-normal flex-1 pr-14 
                                    lg:pr-12 text-sm lg:text-lg bg-white"
                                    rows={4}
                                    maxLength={2000}
                                    placeholder="Escreva aqui o conteúdo da sua história."
                                />
                            </div>

                            <div>
                                <h1 className="md:text-xl text-violet-200 font-bold">Personalizar História:</h1>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                    {tiposLivros.map((v) => (
                                        <TypeStoryBook
                                            key={v.id}
                                            selecionado={typeBook}
                                            onClick={() => setTypeBook(v.tipo)}
                                            image={v.image}
                                            type={v.tipo}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button disabled={loading} 
                        onClick={CreateStory} 
                        className="p-2 my-3 rounded-3xl bg-gradient-to-r from-violet-500 to-rose-500">Enviar História</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default CreateStory;
