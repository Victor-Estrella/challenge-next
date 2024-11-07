"use client";

import { TipoOficina } from "@/type";
import { useEffect, useState } from "react";

export default function Oficinas() {
  const [lista, setLista] = useState<TipoOficina[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/oficina');
        const result = await response.json();
        setLista(result);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);




  const next = () => {
    setCurrentIndex((prevIndex) => {
      const lastIndex = isMobileView ? lista.length - 1 : Math.ceil(lista.length / 2) - 1;
      return prevIndex === lastIndex ? 0 : prevIndex + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      const lastIndex = isMobileView ? lista.length - 1 : Math.ceil(lista.length / 2) - 1;
      return prevIndex === 0 ? lastIndex : prevIndex - 1;
    });
  };

  return (
    <section className="flex flex-col items-center mb-32">
      <h1 className="mx-4 text-2xl font-bold mt-6 mb-10 text-azulclaro min-[460px]:text-4xl md:text-5xl lg:text-6xl lg:mb-20 lg:mt-10">Oficinas próximas</h1>
      {/* Carrossel de Oficinas */}
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {(isMobileView ? lista.concat(lista) : lista).map((oficina, index) => (
            <div key={`${oficina.idOficina}-${index}`} className="flex-shrink-0 w-full md:w-1/2 p-2">
              <ul className="flex flex-col bg-[#DADADA] p-4 rounded-lg mb-6 lg:mx-16">
                <div className="flex justify-between items-center">
                  <li className="text-[#001D5C] font-bold text-lg md:text-xl lg:text-2xl">{oficina.nome}</li>
                  <li className="flex text-black font-semibold text-sm md:text-base lg:text-lg">CNPJ: {oficina.CNPJ}</li>
                </div>
                <li className="text-center text-base md:text-lg my-4">{oficina.endereco} - Tel:{oficina.telefone}</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between mt-4">
          <button onClick={prev} className="bg-white p-2 rounded ml-4">Anterior</button>
          <button onClick={next} className="bg-white p-2 rounded mr-4">Próximo</button>
        </div>
      </div>       
    </section>
  );
}
