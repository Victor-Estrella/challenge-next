import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Integrantes from "@/components/Integrantes/Integrantes";
import Sobre from "@/components/Sobre/Sobre";
import Avaliacao from '@/components/Avaliacao/Avaliacao';



export default function Equipe() {
    return (
        <>
            <Header />
            <Sobre />
            <Avaliacao/>
            <Integrantes />
            <Footer />
        </>
    )
}