"use client";
import { TipoCarro } from '@/type';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

export default function AddCarro() {
  const [formData, setFormData] = useState<TipoCarro>({
    modelo: '',
    ano: '',
    quilometragem: '',
    marca: ''
  });

  const [carros, setCarros] = useState<TipoCarro[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/carros');
      if (!response.ok) throw new Error('Erro ao carregar os carros.');
      const data = await response.json();
      setCarros(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarAno = (ano: number): string | null => {
    const anoAtual = new Date().getFullYear();
    if (ano < 1969) {
      return 'O ano não pode ser menor que 1969.';
    } else if (ano > anoAtual + 1) {
      return 'O ano não pode ser maior que o ano atual mais dois.';
    }
    return null;
  };

  const validarKm = (quilometragem: number): string | null => {
    if (quilometragem < 0) {
      return 'A quilometragem não pode ser menor que 0';
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ano = parseInt(formData.ano, 10);
    const quilometragem = parseFloat(formData.quilometragem);
    const erro = validarAno(ano);
    const erro2 = validarKm(quilometragem);

    if (erro) {
      setError(erro);
      return;
    } else if (erro2) {
      setError2(erro2);
      return;
    }

    setError(null);
    setError2(null);

    try {
      if (editingIndex !== null) {
        // Atualiza o carro existente
        const response = await fetch(`http://localhost:8080/carros/${formData.idCarro}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Erro ao atualizar o carro.');
      } else {
        // Adiciona um novo carro
        const response = await fetch('http://localhost:8080/carros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Erro ao adicionar o carro.');
      }

      // Recarrega a lista de carros
      fetchCars();
      setFormData({
        modelo: '',
        ano: '',
        quilometragem: '',
        marca: ''
      });
      setEditingIndex(null);
    } catch (err) {
      console.error(err);
    }
  };

  const EditarCarro = (index: number) => {
    const carToEdit = carros[index];
    setFormData({
      idCarro: carToEdit.idCarro,
      modelo: carToEdit.modelo,
      ano: carToEdit.ano.toString(),
      quilometragem: carToEdit.quilometragem.toString(),
      marca: carToEdit.marca
    });
    setEditingIndex(index);
  };

  const DeletarCarro = async (index: number) => {
    const carToDelete = carros[index];
    try {
      const response = await fetch(`http://localhost:8080/carros/${carToDelete.idCarro}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar o carro.');

      // Recarrega a lista de carros
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-11/12 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl my-32">
      <div className='w-full flex justify-center bg-azulclaro p-4 rounded-t-2xl'>
        <h2 className="text-xl lg:text-3xl font-bold my-2 text-branco">
          {editingIndex !== null ? 'Editar Carro' : 'Adicionar Carro'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input type="text" id="marca" name="marca" value={formData.marca} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="flex-1">
            <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <input type="text" id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>
        <div>
          <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
          <input type="number" id="ano" name="ano" value={formData.ano} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="quilometragem" className="block text-sm font-medium text-gray-700 mb-1">Quilometragem</label>
          <input type="number" id="quilometragem" name="quilometragem" value={formData.quilometragem} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {error2 && <div className="text-red-500 text-sm mb-4">{error2}</div>}
        <button type="submit" className="bg-azulescuro text-white py-2 px-4 rounded-md hover:bg-blue-600">
          {editingIndex !== null ? 'Salvar Alterações' : 'Adicionar Carro'}
        </button>
      </form>

      {/* Lista de carros */}
      <div className='p-4'>
        <h3 className="text-xl lg:text-3xl font-bold mb-4">Lista de Carros</h3>
        <ul className="space-y-4">
          {carros.map((carro, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-md bg-gray-200">
              <h4 className="font-semibold text-xl lg:text-2xl">{carro.modelo} ({carro.ano})</h4>
              <p className='text-black text-base'><strong>Marca:</strong> {carro.marca}</p>
              <p className='text-black text-base'><strong>Quilometragem:</strong> {carro.quilometragem} km</p>
              <div className="mt-2 flex space-x-2">
                <button onClick={() => EditarCarro(index)} className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">Editar</button>
                <button onClick={() => DeletarCarro(index)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
