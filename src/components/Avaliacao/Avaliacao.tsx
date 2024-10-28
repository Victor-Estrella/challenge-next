"use client";

import { TipoAvaliacao } from "@/type";
import { useEffect, useState } from "react";

export default function Avaliacao() {
  const [lista, setLista] = useState<TipoAvaliacao[]>([]);
  const [nomeCliente, setNomeCliente] = useState("");
  const [avaliacao, setAvaliacao] = useState(1);
  const [comentario, setComentario] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

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

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: avaliacao }, (_, i) => (
      <svg key={i} className="w-5 md:w-6 h-5 md:h-6 mr-1 md:mr-2 lg:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
        <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#01A1FC"/>
      </svg>
    ));
  };

  const handleSubmit = async () => {
    const newAvaliacao = {
      idAvaliacao: Date.now(), // ID temporário
      nomeCliente,
      avaliacao,
      comentario
    };

    try {
      if (editandoId !== null) {
        // Atualização de um depoimento existente
        await fetch(`http://localhost:8080/avaliacao/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAvaliacao),
        });
        setLista(lista.map(item => (item.idAvaliacao === editandoId ? { ...item, nomeCliente, avaliacao, comentario } : item)));
      } else {
        // Criação de um novo depoimento
        const response = await fetch("http://localhost:8080/avaliacao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAvaliacao),
        });
        const savedAvaliacao = await response.json();
        setLista([...lista, savedAvaliacao]);
      }
      resetForm();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  const handleEdit = (avaliacao: TipoAvaliacao) => {
    setNomeCliente(avaliacao.nomeCliente);
    setAvaliacao(avaliacao.avaliacao);
    setComentario(avaliacao.comentario);
    setEditandoId(avaliacao.idAvaliacao);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/avaliacao/${id}`, {
        method: "DELETE",
      });
      setLista(lista.filter(avaliacao => avaliacao.idAvaliacao !== id));
    } catch (error) {
      console.error("Erro ao excluir depoimento:", error);
    }
  };

  const resetForm = () => {
    setNomeCliente("");
    setAvaliacao(1);
    setComentario("");
    setEditandoId(null);
  };

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
      <h1 className="mx-4 text-2xl font-bold mt-6 mb-10 text-azulclaro min-[460px]:text-4xl md:text-5xl lg:text-6xl lg:mb-20 lg:mt-10">O que nossos clientes dizem</h1>
      {/* Formulário para adicionar/editar depoimento */}
      <div className="w-full max-w-md p-4 mb-8 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-azul">Avalie-nos também!</h3>
        <input type="text" placeholder="Nome" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} className="w-full p-2 mb-4 border rounded"/>
        <input type="number" placeholder="Avaliação (1 a 5)" value={avaliacao} onChange={(e) => setAvaliacao(Number(e.target.value))} className="w-full p-2 mb-4 border rounded" min="1"max="5"/>
        <textarea placeholder="Comentário" value={comentario} onChange={(e) => setComentario(e.target.value)} className="w-full p-2 mb-4 border rounded"></textarea>
        <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded"> {editandoId !== null ? "Atualizar" : "Adicionar"} Depoimento</button>
      </div>

      {/* Carrossel de Depoimentos */}
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {(isMobileView ? lista.concat(lista) : lista).map((avaliacao, index) => (
            <div key={`${avaliacao.idAvaliacao}-${index}`} className="flex-shrink-0 w-full md:w-1/2 p-2">
              <ul className="flex flex-col bg-[#DADADA] p-4 rounded-lg mb-6 lg:mx-16">
                <div className="flex justify-between items-center">
                  <li className="text-[#001D5C] font-bold text-lg md:text-xl lg:text-2xl">{avaliacao.nomeCliente}</li>
                  <li className="flex">{renderStars(avaliacao.avaliacao)}</li>
                </div>
                <li className="text-center text-base md:text-lg my-4">{avaliacao.comentario}</li>
                <div className="w-full flex justify-between">
                  <button onClick={() => handleEdit(avaliacao)} className="text-blue-500 mr-2">Editar</button>
                  <button onClick={() => handleDelete(avaliacao.idAvaliacao)} className="text-red-500">Excluir</button>
                </div>
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
