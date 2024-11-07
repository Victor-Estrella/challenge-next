export default function Perguntas() {
    return (
        <section className="flex flex-col items-center w-full my-20">
            <h2 className="text-4xl text-azulclaro font-bold m-10 md:text-5xl lg:text-6xl">Perguntas Frequentes</h2>
            <div className="flex gap-12 m-6 mb-10 flex-wrap flex-row md:justify-around md:m-0 md:my-10 xl:gap-[6em]">
                <p className="text-sm  p-6 w-11/12 bg-[#C6D8F0] text-black md:text-base md:w-2/5 lg:text-xl lg:w-80 lg:h-80"><span className="font-bold">O aplicativo oferece suporte técnico ou atendimento ao cliente?</span><br /><br />
                    Sim, nós possuímos um formulário logo abaixo para que você possa nos contar o que você precisa para que assim possamos auxiliá-lo</p>

                <p className="text-sm  p-6 w-11/12 bg-[#C6F9FF] text-black md:text-base md:w-2/5 lg:text-xl lg:w-80 lg:h-80"><span className="font-bold">Quais informações preciso fornecer para obter um diagnóstico preciso?</span><br /><br />
                    Descrever da maneira mais detalhada o possível o que está ocorrendo com seu automóvel</p>

                <p className="text-sm  p-6 w-11/12 bg-[#CCFF99] text-black md:text-base md:w-2/5 lg:text-xl lg:w-80 lg:h-80"><span className="font-bold">Existe algum custo para usar o aplicativo?</span><br /><br />
                    O custo será calculado por serviço com base no diagnóstico e escolha de mecânico.</p>

                <p className="text-sm  p-6 w-11/12 bg-[#B0E0E6] text-black md:text-base md:w-2/5 lg:text-xl lg:w-80 lg:h-80"><span className="font-bold">O aplicativo pode ajudar em situações de emergência?</span><br /><br />
                    O nosso aplicativo oferece uma opção de autoajuda para soluções rápidas e também permite localizar mecânicos confiáveis na região do cliente</p>
            </div>
        </section>
    )
}