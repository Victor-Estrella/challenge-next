import Footer from '../../components/Footer/Footer' 
import Header from '../../components/Header/Header'
import AddCarro from "../../components/AdicionarCarro/AdicionarCarro";
import Funcionalidade from '../../components/Funcionalidade/Funcionalidade';
import Avaliacao from '@/components/Avaliacao/Avaliacao';

export default function FuncionalidadePagina() {
    return (
        <>
            <Header />
            <AddCarro/>
            <Funcionalidade />
            <Avaliacao/>
            <Footer />
        </>
    )
}