import Image from 'next/image'
import Link from 'next/link'
import Engrenagem from '../../public/img/engranagem.png'

export default function NotFound() {
    return(
        <section className='flex flex-col items-center'>
            <h2 className='font-bold text-2xl mx-10 mt-10'>Ops! Conteúdo não localizado!</h2>
            <Image src={Engrenagem} alt="Página não localizada" className='w-1/5' />
            <Link className='font-bold bg-azulclaro text-lg text-branco p-6 rounded-2xl' href="/funcionalidade">Clique aqui para voltar para o ínicio</Link>
        </section>
    )
}