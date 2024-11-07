import Footer from '@/components/Footer/Footer' 
import Header from '@/components/Header/Header'
import AddCarro from "@/components/AdicionarCarro/AdicionarCarro";
import Funcionalidade from '@/components/Funcionalidade/Funcionalidade';
import Pecas from '@/components/Pecas/Pecas';
import Oficinas from '@/components/Oficinas/Oficinas';

export default function FuncionalidadePagina() {
    return (
        <>
            <Header />
            <AddCarro/>
            <Funcionalidade />
            <Oficinas/>
            <Pecas/>
            <Footer />
        </>
    )
}