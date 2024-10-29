'use client';
import { use, useEffect, useRef, useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import LastPage from "@/app/_components/LastPage";

import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io'
import CustomLoading from "@/app/_components/CustomLoading";
import Header from "@/app/_components/Header";

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

interface Flips {
    flipNext?: () => void; // Método opcional para avançar a página
    flipPrev?: () => void; // Método opcional para voltar a página
}

interface PageFlipInstance {
    pageFlip: () => Flips; // A função pageFlip retorna um objeto do tipo Flips
}


const ViewStory = ({ params }: ViewStoryProps) => {
    const [story, setStory] = useState<ApiResponse | null>(null);
    const unwrapperParams = use(params);
    const [count, setCount] = useState<number>(0);
    const [Loading, setLoading] = useState<boolean>(false);

    const bookRef = useRef<PageFlipInstance | null>(null);

    useEffect(() => {
        const getStory = async () => {
            setLoading(true);
            const response = await fetch(`/api/getStory?id=${unwrapperParams.id}`);
            const data: ApiResponse = await response.json();
            console.log(data.data.coverImage);
            console.log(data.data);
            setStory(data);

            setLoading(false);
        };
        
        getStory();
    }, [unwrapperParams.id]);

    return (
        <div className="text-white bg-black w-full h-full">
            <Header logado={true} />
            {story ? (
                <div className="p-10 md:px-20 lg:px-40 flex items-center justify-center flex-col">
                    <h2 className="font-bold text-4xl text-center p-10 text-violet-500">
                        {story.data.output.story_name}
                    </h2>
                    <div className="relative">
                        {/*  @ts-expect-error as @ts-ignore */}
                        <HTMLFlipBook
                            width={500}
                            height={500}
                            showCover={true}
                            className="mt-5"
                            useMouseEvents={false}
                            ref={bookRef}
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

                        {count !=0 && 
                            <div className="absolute -left-8 top-[250px]">
                                <IoIosArrowDropleftCircle className="text-[60px] text-violet-500" onClick={() => {
                                    // @ts-expect-error as @ts-ignore
                                    bookRef.current.pageFlip().flipPrev();
                                    setCount(count - 1);
                                }}/>
                            </div>
                        }

                        {
                            count < (story.data.output.chapters.length+1) &&
                            <div className="absolute -right-8 top-[250px]" onClick={() => {
                                // @ts-expect-error as @ts-ignore
                                bookRef.current.pageFlip().flipNext();
                                setCount(count + 1);
                            }}>
                                <IoIosArrowDroprightCircle className="text-[60px] text-violet-500"/>
                            </div>
                        }

                    </div>
                </div>
            ) : (
                <div>
                    <CustomLoading loading={Loading} />
                </div>
            )}
        </div>
    );
};

export default ViewStory;
