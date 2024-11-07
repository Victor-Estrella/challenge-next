"use client";
import { TipoPeca } from '@/type';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

export default function Pecas() {
  const [formData, setFormData] = useState<TipoPeca>({
    nomePeca: '',
    precoPeca: ''
  });

  const [pecas, setPecas] = useState<TipoPeca[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchPecas = async () => {
    try {
      const response = await fetch('http://localhost:8080/peca');
      if (!response.ok) throw new Error('Erro ao carregar as peças.');
      const data = await response.json();
      setPecas(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPecas();
  }, []);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingIndex !== null) {
        // Atualiza o peça existente
        const response = await fetch(`http://localhost:8080/peca/${formData.idPeca}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Erro ao atualizar a peça.');
      } else {
        // Adiciona uma nova peça
        const response = await fetch('http://localhost:8080/peca', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Erro ao adicionar a peça.');
      }

      // Recarrega a lista de pecas
      fetchPecas();
      setFormData({
        nomePeca: '',
        precoPeca: ''
      });
      setEditingIndex(null);
    } catch (err) {
      console.error(err);
    }
  };

  const EditarPeca = (index: number) => {
    const pecaToEdit = pecas[index];
    setFormData({
      idPeca: pecaToEdit.idPeca,
      nomePeca: pecaToEdit.nomePeca,
      precoPeca: pecaToEdit.precoPeca.toString(),
    });
    setEditingIndex(index);
  };

  const DeletarPeca = async (index: number) => {
    const carToDelete = pecas[index];
    try {
      const response = await fetch(`http://localhost:8080/peca/${carToDelete.idPeca}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar a peça.');

      // Recarrega a lista de peças
      fetchPecas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-11/12 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl my-32">
      <div className='w-full flex justify-center bg-azulclaro p-4 rounded-t-2xl'>
        <h2 className="text-xl lg:text-3xl font-bold my-2 text-branco">
          {editingIndex !== null ? 'Editar Peça' : 'Adicionar Peça'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label htmlFor="nomePeca" className="block text-sm font-medium text-gray-700 mb-1">Nome da peça</label>
            <input type="text" id="nomePeca" name="nomePeca" value={formData.nomePeca} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>
        <div>
          <label htmlFor="precoPeca" className="block text-sm font-medium text-gray-700 mb-1">Preço da peça</label>
          <input type="number" id="precoPeca" name="precoPeca" value={formData.precoPeca} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2" />
        </div>

        <button type="submit" className="bg-azulescuro text-white py-2 px-4 rounded-md hover:bg-blue-600">
          {editingIndex !== null ? 'Salvar Alterações' : 'Adicionar Peça'}
        </button>
      </form>

      {/* Lista de pecas */}
      <div className='p-4'>
        <h3 className="text-xl lg:text-3xl font-bold mb-4">Lista de peças</h3>
        <ul className="space-y-4">
          {pecas.map((peca, index) => (
            <li key={index} className="p-4 border flex items-center justify-between border-gray-300 rounded-md bg-gray-200">
              <h4 className="font-semibold text-sm md:text-lg lg:text-xl">{peca.nomePeca} - R${peca.precoPeca}</h4>
              <div className="flex space-x-2">
                <button onClick={() => EditarPeca(index)} className="bg-yellow-500 text-white py-1 px-3 text-sm md:text-lg rounded-md hover:bg-yellow-600">Editar</button>
                <button onClick={() => DeletarPeca(index)} className="bg-red-500 text-white py-1 px-3 text-sm md:text-lg rounded-md hover:bg-red-600">Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
