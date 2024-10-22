"use client"

import { TipoAvaliacao } from "@/type";
import { useEffect, useState } from "react";

export default function Avaliacao(){

  const [lista, setLista] = useState<TipoAvaliacao[]>([])

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


  return(
    <section className="flex flex-col items-center mb-32">
      <div className="flex justify-center w-full">
        <h1 className="text-4xl font-bold mt-6 mb-10 text-azulclaro min-[460px]:text-5xl md:text-6xl lg:text-7xl lg:mt-10">O que nossos clientes acham</h1>
      </div>
      <div>
        {lista.map(avaliacao => (
        <ul key={avaliacao.idAvaliacao} className="flex flex-col bg-[#DADADA] p-4 rounded-lg">
          <div className="flex gap-5">
            <li className="text-[#001D5C] font-bold text-2xl">{avaliacao.nomeCliente}</li>
            <li>{avaliacao.avaliacao}</li>
          </div>
          <li className="text-center text-lg my-4">{avaliacao.comentario}</li>
        </ul>
      ))}
      </div>
    </section>    
  )
}