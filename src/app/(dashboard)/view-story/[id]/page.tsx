'use client';
import { use, useEffect, useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import LastPage from "@/app/_components/LastPage";

interface Params {
    id: string;
}

interface ViewStoryProps {
    params: Promise<Params>;
}

interface Chapter {
    chapter_title: string;
    description: string;
}

interface StoryData {
    coverImage: string;
    output: {
        story_name: string;
        chapters: Chapter[];
    };
}

interface ApiResponse {
    data: StoryData;
}

const ViewStory = ({ params }: ViewStoryProps) => {
    const [story, setStory] = useState<ApiResponse | null>(null);
    const unwrapperParams = use(params);

    useEffect(() => {
        const getStory = async () => {
            const response = await fetch(`/api/getStory?id=${unwrapperParams.id}`);
            const data: ApiResponse = await response.json();
            console.log(data.data.coverImage);
            console.log(data.data);
            setStory(data);
        };
        
        getStory();
    }, [unwrapperParams.id]);

    return (
        <div className="text-white">
            {story ? (
                <div className="p-10 md:px-20 lg:px-40">
                    <h2 className="font-bold text-4xl text-center p-10 text-violet-500">
                        {story.data.output.story_name}
                    </h2>
                    {/*  @ts-expect-error as @ts-ignore */}
                    <HTMLFlipBook
                        width={500}
                        height={500}
                        showCover={true}
                        className="mt-5"
                    >
                        <div>
                            <BookCoverPage imageUrl={story.data.coverImage} />
                        </div>
                        {story.data.output.chapters.map((chapter, index) => (
                            <div key={index} className="bg-white p-10">
                                <StoryPages storyChapter={chapter} />
                            </div>
                        ))}
                        <div>
                            <LastPage />
                        </div>
                    </HTMLFlipBook>
                </div>
            ) : (
                <div>
                    <p>Carregando...</p>
                </div>
            )}
        </div>
    );
};

export default ViewStory;
