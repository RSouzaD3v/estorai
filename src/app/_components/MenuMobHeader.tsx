'use client'
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const MenuMobHeader = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const toggleSidebar = () => {
        setIsHidden((prevHidden) => !prevHidden);
    };

    return (
        <div className="md:hidden">
            <button onClick={toggleSidebar} className="
            hover:bg-white/10 rounded-full 
            w-[50px] h-[50px]
            flex items-center justify-center">
                <MenuIcon />
            </button>

            <div className={`${isHidden ? "hidden" : "fixed"} flex flex-col items-center h-screen p-5 bg-black/50 backdrop-blur-sm top-0 right-0 z-50`}>
                <nav className="relative flex items-center flex-col">
                        <button onClick={toggleSidebar} className="text-xl absolute right-0">X</button>
                        <ul className="mt-20 mb-14 flex flex-col gap-10">
                            <li><Link className="text-white" href="">Experimentar Estorai</Link></li>
                            <li><Link className="text-white" href="">Criar Histórias</Link></li>
                            <li><Link className="text-white" href="">Sobre Nós</Link></li>
                            <li><Link className="text-white" href="">WorldKids</Link></li>
                        </ul>

                        <Link className="mt-20" href={"/"}>
                            <button className="bg-violet-600 text-white p-2 rounded-3xl">
                                Fazer Login
                            </button>
                        </Link>
                </nav>
            </div>
        </div>
    )
}