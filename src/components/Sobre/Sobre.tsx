import Faixa from "../Faixa/Faixa";

export default function Sobre() {
    return (
        <section className="flex flex-col items-center">
            <div className="flex justify-center w-full">
                <h1 className="text-5xl font-bold mt-28 mb-10 text-azulclaro md:text-6xl lg:text-7xl">Sobre nós</h1>
            </div>
            <p className="flex text-azulescuro bg-cinza text-lg p-6 w-8/12 md:text-xl lg:text-2xl">Na Descomplica Auto, nosso objetivo é simplificar e agilizar a assistência aos motoristas. Desenvolvemos um aplicativo que acelera a resolução de problemas com veículos, oferecendo suporte imediato e eficiente. Seja para questões pequenas ou emergências, nosso aplicativo reduz a burocracia e proporciona uma ajuda rápida, tornando a experiência de dirigir mais tranquila e sem complicações.</p>
            <Faixa/>
        </section>
    )
}