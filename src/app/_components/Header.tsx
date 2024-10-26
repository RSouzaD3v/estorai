import Image from "next/image";
import logo from "../../../public/logo.svg";
import { Container } from "./Container";
import Link from "next/link";
import { MenuMobHeader } from "./MenuMobHeader";

const Header = () => {
    return (
        <header className="flex items-center justify-center bg-black text-violet-300 p-2">
            <Container className="flex items-center justify-between">
                <div>
                    <Image width={50} height={50} src={logo} alt="logo" />
                </div>

                <nav className="hidden md:flex items-center md:gap-5">
                    <ul className="flex items-center md:gap-10">
                        <li><Link className="text-violet-300" href="/create-story">Experimentar Estorai</Link></li>
                        <li><Link className="text-violet-300" href="/create-story">Criar Histórias</Link></li>
                        <li><Link className="text-violet-300" href="">Sobre Nós</Link></li>
                        <li><Link className="text-violet-300" href="">WorldKids</Link></li>
                    </ul>

                    <Link href={"/create-story"}>
                        <button className="bg-violet-600 text-white p-2 rounded-3xl">
                            Fazer Login
                        </button>
                    </Link>
                </nav>

                <MenuMobHeader />
            </Container>
        </header>
    )
}

export default Header;