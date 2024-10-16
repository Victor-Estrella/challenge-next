import Image from "next/image"
import Github from "../../../public/img/github.png"
import Henrique from "../../../public/img/henrique.png"
import Monteiro from "../../../public/img/monteiro.jpg"
import Petruk from "../../../public/img/petruk.jpg"
import Faixa from "../Faixa/Faixa"

export default function Integrantes() {
    return (
        <section className="flex flex-col items-center w-full mt-16">
            <h2 className="text-4xl text-azulclaro font-medium m-12 md:text-5xl lg:text-6xl">Integrantes</h2>
            <div className="flex flex-col gap-[0.5em] mb-12 w-11/12 items-center md:justify-evenly md:flex-row md:flex-wrap md:w-auto lg:gap-[1.5em] xl:gap-[9em]">
                <div className="mt-2.5 bg-transparent border border-[#0000b4d3] rounded-2xl p-6 md:max-w-[40.3%]">
                    <Image src={Monteiro} alt="Julia Monteiro" className="w-[14em] h-[18em] md:w-[16em] md:max-w-[16em] md:h-[21em] lg:w-[18em] lg:h-[25em]" />
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">Julia Monteiro</p>
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">RM:557023</p>
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">1TDSPH</p>
                    <a href="https://github.com/jliamonteiro" className="md:flex md:max-w-56" target="_blank"><Image src={Github} alt="Ícone github" className="w-16 mt-1.5 ml-2.5" /></a>
                </div>
                <div className="mt-2.5 bg-transparent border border-[#0000b4d3] rounded-2xl p-6 md:max-w-[40.3%]">
                    <Image src={Petruk} alt="Sofia Petruk" className="w-[14em] h-[18em] md:w-[16em] md:max-w-[16em] md:h-[21em] lg:w-[18em] lg:h-[25em]" />
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">Sofia Andrade Petruk</p>
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">RM:556585</p>
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">1TDSPH</p>
                    <a href="https://github.com/sofiapetruk" className="md:flex md:max-w-56" target="_blank"><Image src={Github} alt="Ícone github" className="w-16 mt-1.5 ml-2.5" /></a>
                </div>
                <div className="mt-2.5 bg-transparent border border-[#0000b4d3] rounded-2xl p-6 md:max-w-[40.3%]">
                    <Image src={Henrique} alt="Victor Henrique" className="w-[14em] h-[18em] md:w-[16em] md:max-w-[16em] md:h-[21em] lg:w-[18em] lg:h-[25em]" />
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal max-w-56 md:ml-0 md:max-w-96">Victor Henrique Estrella Carracci</p>
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">RM:556206</p>
                    <p className="text-lg text-black mt-1.5 ml-1.5 font-normal md:max-w-56">1TDSPH</p>
                    <a href="https://github.com/Victor-Estrella" className="md:flex md:max-w-56" target="_blank"><Image src={Github} alt="Ícone github" className="w-16 mt-1.5 ml-2.5" /></a>
                </div>
            </div>
            <Faixa/>
        </section>
    )
}