interface StoryChapter {
    chapter_title: string;
    description: string;
}

interface StoryPagesProps {
    storyChapter: StoryChapter;
}

const StoryPages = ({ storyChapter }: StoryPagesProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-violet-500">{storyChapter.chapter_title}</h2>
            <p className="text-xl p-5 mt-3 rounded-lg bg-slate-800 text-white">
                {storyChapter.description}
            </p>
        </div>
    );
};

export default StoryPages;
