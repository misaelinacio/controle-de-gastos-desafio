import { useState, useEffect } from 'react';
import type { Pessoa } from '../types';
import api from '../services/api';

interface GerenciarPessoasProps {
  onAcaoConcluida: () => void;
  atualizarTrigger: number;
}

const GerenciarPessoas = ({
  onAcaoConcluida,
  atualizarTrigger,
}: GerenciarPessoasProps) => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [novaPessoa, setNovaPessoa] = useState({
    nome: '',
    idade: 0,
  });

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await api.get<Pessoa[]>('/pessoas');
        setPessoas(response.data);
      } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
      }
    };

    fetchPessoas();
  }, [atualizarTrigger]);

  const handleAdicionar = async () => {
    if (!novaPessoa.nome.trim() || novaPessoa.idade <= 0) {
      alert('Por favor, preencha um nome válido e uma idade maior que 0.');
      return;
    }

    try {
      await api.post('/pessoas', novaPessoa);

      onAcaoConcluida(); 
      setNovaPessoa({ nome: '', idade: 0 }); 
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
      alert('Erro ao adicionar pessoa. Verifique o console.');
    }
  };

  const handleRemover = async (id: number) => {
    try {
      await api.delete(`/pessoas/${id}`);
      onAcaoConcluida();
    } catch (error) {
      console.error('Erro ao remover pessoa:', error);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        margin: '20px 0',
        borderRadius: '8px',
      }}
    >
      <h2>Gerenciar Pessoas</h2>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Nome"
          value={novaPessoa.nome}
          onChange={(e) =>
            setNovaPessoa({ ...novaPessoa, nome: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Idade"
          value={novaPessoa.idade || ''}
          onChange={(e) =>
            setNovaPessoa({
              ...novaPessoa,
              idade: Number(e.target.value),
            })
          }
        />

        <button onClick={handleAdicionar}>
          Adicionar
        </button>
      </div>

      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id} style={{ marginBottom: '5px' }}>
            {pessoa.nome} - {pessoa.idade} anos

            <button
              onClick={() => handleRemover(pessoa.id)}
              style={{
                marginLeft: '10px',
                color: 'red',
              }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GerenciarPessoas;