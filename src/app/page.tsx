import Link from "next/link";
import { Container } from "./_components/Container";
import Header from "./_components/Header";
import Image from "next/image";
import BoyImage from '../../public/flyeind-boy.jpg';
import markfyLogo from '../../public/logo.png';

export default function Home() {
  return (
    <div className="bg-black  text-white h-full">
      <Header />

      <main className="flex items-center justify-center flex-col mt-5">
        <Container>
          <section className="px-2 flex flex-col md:flex-row items-center gap-3 md:gap-0 md:justify-between justify-center">
            <div>
                <h1 className="text-7xl font-bold text-violet-500">Estor<b className="text-white">ai</b></h1>
                <p className="text-xl font-bold">
                  Use a criatividade para gerar <br /> 
                  livros com IA.
                </p>
                <p className="my-5">
                  Plantaforma bem intuitiva para todos os gostos, e idade, sendo <br /> 
                  uma das plantaformas mais inclusivas do mercado!
                </p>

                <Link href={"/create-story"}>
                  <button className="p-2 rounded-3xl bg-gradient-to-r from-violet-500 to-rose-500">Fazer Login</button>
                </Link>
            </div>
            <div className="w-[100%] min-h-[300px] md:w-[480px] md:h-[480px] overflow-hidden rounded-xl">
              <Image src={BoyImage} alt="Menino Voando" />
            </div>
          </section>
        </Container>
      </main>

      <div className="flex items-center justify-center">
        <Container className="flex items-center my-5 gap-2">
          <div className="w-[34px] h-[35px] opacity-20 hover:opacity-100">
            <Image src={markfyLogo} alt="Markfy Logo" />
          </div>
          <h1 className="opacity-20 hover:opacity-100">Desenvolvido por <b className="text-orange-500">Markfy</b></h1>
        </Container>
      </div>

    </div>
  );
}
