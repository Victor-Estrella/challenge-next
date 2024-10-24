"use client";

import { TipoAvaliacao } from "@/type";
import { useEffect, useState } from "react";

export default function Avaliacao() {
  const [lista, setLista] = useState<TipoAvaliacao[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/avaliacao');
        const result = await response.json();
        setLista(result);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  // Função para renderizar as estrelas
  const renderStars = (avaliacao: number) => {
    const stars = [];
    for (let i = 0; i < avaliacao; i++) {
      stars.push(
        <svg key={i} className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
          <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#01A1FC"/>
        </svg>
      );
    }
    return stars;
  };

 
  const itemsPerPage = 4;
  const totalPages = lista.length

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
  };

  return (
    <section className="flex flex-col items-center mb-32">
      <div className="flex justify-center w-full">
        <h1 className="text-4xl font-bold mt-6 mb-10 text-azulclaro min-[460px]:text-5xl md:text-6xl lg:text-7xl lg:mt-10">O que nossos clientes acham</h1>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
          {lista.map((avaliacao) => (
            <div key={avaliacao.idAvaliacao} className="flex-shrink-0 w-full md:w-1/4 p-2"> {/* Definindo a largura */}
              <ul className="flex flex-col bg-[#DADADA] p-4 rounded-lg mb-6">
                <div className="flex items-center gap-5">
                  <li className="text-[#001D5C] font-bold text-2xl">{avaliacao.nomeCliente}</li>
                  <li className="flex">{renderStars(avaliacao.avaliacao)}</li>
                </div>
                <li className="text-center text-lg my-4">{avaliacao.comentario}</li>
              </ul>
            </div>
          ))}
        </div>
        <button onClick={prev} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded">Anterior</button>
        <button onClick={next} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded">Próximo</button>
      </div>
    </section>
  );
}
