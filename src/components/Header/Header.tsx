import Link from "next/link";
import Image from "next/image"; 
import Ajuda from "../../../public/img/ajuda.svg";
import Funcionalidade from "../../../public/img/feed.svg";
import Logo from "../../../public/img/logo.png";
import Logout from "../../../public/img/logout.svg";
import Sobre from "../../../public/img/sobre.svg";

export default function Header() {
    return (
        <header className="flex bg-azulclaro items-center justify-center md:justify-center h-24 lg:h-32">
            <div className="flex items-center gap-7 md:w-full md:justify-evenly">
                <Image src={Logo} className="w-20 md:w-32 lg:w-44" alt="Logo da Porto Seguro"/>
                <Link href="/ajuda" className="group">
                    <Image src={Ajuda} alt="Página de ajuda" className="w-9/12 lg:hidden" />
                    <p className="hidden text-white lg:block text-2xl lg:hover:text-azulescuro font-semibold">Ajuda</p>
                </Link>
                <Link href="/funcionalidade" className="group">
                    <Image src={Funcionalidade} alt="Página de funcionalidade" className="w-9/12 lg:hidden" />
                    <p className="hidden text-white lg:block text-2xl lg:hover:text-azulescuro font-semibold">Funcionalidade</p>
                </Link>
                <Link href="/equipe" className="group relative">
                    <Image src={Sobre} alt="Página de sobre" className="w-9/12 lg:hidden" />
                    <p className="hidden text-white lg:block text-2xl lg:hover:text-azulescuro font-semibold">Sobre</p>
                </Link>
                <Link href="/" className="group relative">
                    <Image src={Logout} alt="Logout" className="w-9/12 lg:hidden" />
                    <p className="hidden text-white lg:block text-2xl lg:hover:text-azulescuro font-semibold">Sair</p>
                </Link>
            </div>
        </header>
    );
}
