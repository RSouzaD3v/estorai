import { Button } from "@nextui-org/button";
import { CardFooter, Card } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";

interface StoryOutput {
    story_name: string;
    description: string;
    // Adicione outras propriedades relevantes de `output` aqui
}

interface StoryItem {
    story: {
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
}


const StoryItemCard = ({story}: StoryItem) => {
    return (
        <Link href={`/view-story/${story.storyId}`}>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 hover:scale-105
            transition-all cursor-pointer">
                <Image
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={story?.coverImage}
                    width={500}
                    height={500}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                    <p className="text-violet-900 font-bold text-[16px]">{story.output.story_name}</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Ler Agora
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default StoryItemCard;