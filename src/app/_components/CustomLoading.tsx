import Image from "next/image";
import coelho from '../../../public/coelho.gif';

const CustomLoading = ({ loading }: { loading: boolean }) => {

    return (
        <div className={`${loading ? "flex" : "hidden"} absolute top-0 left-0 bg-black/10 backdrop-blur-sm items-center justify-center w-screen h-screen`}>
            <div className="bg-white rounded-xl p-5 flex items-center justify-center flex-col">
                <Image src={coelho} width={250} height={250} alt="Coelho animado" />
                <h1 className="text-2xl text-violet-800">Aguarde uns segundos...</h1>
            </div>
        </div>
    )
}

export default CustomLoading;