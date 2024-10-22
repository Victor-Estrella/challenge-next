import Image from 'next/image';
import Faixa from '../Faixa/Faixa'
import Mecanicos from '../../../public/img/mecanicos.svg'

export default function Funcionalidade() {
    return (
        <section className="flex flex-col items-center ">
            <Faixa/>
            <div className="flex justify-center w-full">
                <h1 className="text-4xl font-bold mt-6 mb-10 text-azulclaro min-[460px]:text-5xl md:text-6xl lg:text-7xl lg:mt-10">Funcionalidade</h1>
            </div>
            <div className="flex justify-center w-11/12 lg:w-4/5 xl:w-3/4">
                <span className="flex flex-col-reverse items-center text-azulescuro bg-cinza p-6 md:w-11/12 text-lg md:text-xl md:flex-row lg:text-2xl">O Descomplica Auto é um aplicativo baseado em inteligência artificial que visa ajudar usuários com problemas no veículo.
                    Disponível em plataformas web e como app para celular, ele permite que o cliente descreva os sintomas do carro, como “está saindo fumaça” ou “ouço barulhos”.
                    O sistema então fornece um diagnóstico preliminar e uma estimativa de custo, facilitando e acelerando o processo de conserto.
                    <Image className='max-w-full w-96' src={Mecanicos} alt="Vetores de mecânicos consertando carro" />
                </span>
            </div>
            <Faixa/>
        </section>
    )
}