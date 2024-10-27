import Image, { StaticImageData } from "next/image";

interface TypeStoryBookProps {
    image: StaticImageData | string;
    type: string;
    onClick?: () => void;
    selecionado: string;
}

const TypeStoryBook = ({ image, type, onClick, selecionado }: TypeStoryBookProps) => {
    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer w-[150px] h-[150px] bg-black rounded-lg overflow-hidden 
                ${selecionado === type ? "border-2 border-white" : ""}`}
        >
            <Image className="opacity-50 absolute top-0 left-0 w-full h-full object-cover z-0" src={image} alt="" />

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h1 className="text-white font-bold text-center">{type}</h1>
            </div>
        </div>
    );
};

export default TypeStoryBook;
