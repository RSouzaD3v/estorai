'use client';

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import StoryItemCard from "./StoryItemCard";
import CustomLoading from "@/app/_components/CustomLoading";

interface StoryOutput {
    story_name: string;
    description: string;
    // Adicione outras propriedades relevantes de `output` aqui
}

interface StoryItem {
    ageGroup: string;
    coverImage: string;
    createdAt: string;
    createdBy: string;
    id: number;
    imageStyle: string;
    output: StoryOutput; // Tipagem específica para `output`
    storyId: string;
    storySubject: string;
    storyType: string;
    updatedAt: string;
}

const UserStoryList = () => {
    const { user } = useUser();
    const [storyList, setStoryList] = useState<StoryItem[]>([]); // Tipagem do estado como array de `StoryItem`
    const [loading, setLoading] = useState<boolean>(true); // Estado para gerenciar o carregamento

    useEffect(() => {
        if (user) {
            getStories();
        }
    }, [user]);

    const getStories = async () => {
        try {
            setLoading(true);
            const response = await axios.get<{ stories: StoryItem[] }>('/api/getStories');
            setStoryList(response.data.stories); // Define o estado com a lista de histórias
        } catch (error) {
            console.error("Erro ao buscar histórias:", error);
        } finally {
            setLoading(false); // Define como false após a conclusão da chamada, com sucesso ou erro
        }
    };

    return (
        <div>
            <h1>Lista de Histórias</h1>
            {loading ? (
                <CustomLoading loading={loading} />
            ) : storyList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {storyList && storyList.map((item) => (
                        <div key={item.id}>
                            <StoryItemCard story={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhuma história encontrada.</p>
            )}
        </div>
    );
};

export default UserStoryList;
