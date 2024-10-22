"use client"

import { TipoAvaliacao } from "@/type";
import { useEffect, useState } from "react";

export default function Avaliacao(){


    const [lista, setLista] = useState<TipoAvaliacao[]>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/megafarma');
            const result = await response.json();
            setLista(result);
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          }
        };
    
        fetchData();
      }, []);


    return(
        <div>
            <h1>Produtos</h1>
            <table className="tabelaProd">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map(avaliacao => (
                        <tr key={avaliacao.codigo}>
                            <td>{avaliacao.codigo}</td>
                            <td>{avaliacao.nome}</td>
                            <td>{avaliacao.preco}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>Total de produtos: {lista.length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}