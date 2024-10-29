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
    flipNext?: () => void;
    flipPrev?: () => void;
}

interface PageFlipInstance {
    pageFlip: () => Flips;
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
            setStory(data);
            setLoading(false);
        };
        
        getStory();
    }, [unwrapperParams.id]);

    return (
        <div className="text-white bg-black min-h-screen">
            <Header logado={true} />
            
            {story ? (
                <div className="p-5 md:px-10 lg:px-20 flex items-center justify-center flex-col">
                    <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center p-5 text-violet-500">
                        {story.data.output.story_name}
                    </h2>
                    <div className="relative w-full flex items-center justify-center">
                        {/* @ts-expect-error as @ts-ignore */}
                        <HTMLFlipBook
                            width={Math.min(300, window.innerWidth - 50)}
                            height={Math.min(300, window.innerHeight - 50)}
                            showCover={true}
                            className="mt-5"
                            useMouseEvents={false}
                            ref={bookRef}
                        >
                            <div>
                                <BookCoverPage imageUrl={story.data.coverImage} />
                            </div>
                            {story.data.output.chapters.map((chapter, index) => (
                                <div key={index} className="bg-white p-5 md:p-10">
                                    <StoryPages storyChapter={chapter} />
                                </div>
                            ))}
                            <div>
                                <LastPage />
                            </div>
                        </HTMLFlipBook>

                        {count > 0 && 
                            <div className="absolute md:left-5 -left-2 top-1/2 transform">
                                <IoIosArrowDropleftCircle className="text-[40px] md:text-[60px] text-violet-500 cursor-pointer" onClick={() => {
                                    // @ts-expect-error as @ts-ignore
                                    bookRef.current.pageFlip().flipPrev();
                                    setCount(count - 1);
                                }} />
                            </div>
                        }

                        {count < (story.data.output.chapters.length) && 
                            <div className="absolute top-1/2 transform md:right-5 -right-2" onClick={() => {
                                // @ts-expect-error as @ts-ignore
                                bookRef.current.pageFlip().flipNext();
                                setCount(count + 1);
                            }}>
                                <IoIosArrowDroprightCircle className="text-[40px] md:text-[60px] text-violet-500 cursor-pointer" />
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <CustomLoading loading={Loading} />
                </div>
            )}
        </div>
    );
};

export default ViewStory;
