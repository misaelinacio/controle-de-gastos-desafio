import { useState, useEffect } from 'react';
import { type Transacao, type Pessoa, TipoTransacao } from '../types';
import api from '../services/api'; 

interface GerenciarTransacoesProps {
  onAcaoConcluida: () => void;
  atualizarTrigger: number;
}

const GerenciarTransacoes = ({ onAcaoConcluida, atualizarTrigger }: GerenciarTransacoesProps) => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [novaTransacao, setNovaTransacao] = useState<{
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    pessoaId: number;
  }>({
    descricao: '',
    valor: 0,
    tipo: TipoTransacao.Receita,
    pessoaId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transacoesRes = await api.get<Transacao[]>('/transacoes');
        setTransacoes(transacoesRes.data);

        const pessoasRes = await api.get<Pessoa[]>('/pessoas');
        setPessoas(pessoasRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, [atualizarTrigger]);

  const handleAdicionar = async () => {
    try {
      if (!novaTransacao.descricao || novaTransacao.valor <= 0 || novaTransacao.pessoaId === 0) {
        alert("Preencha todos os campos corretamente.");
        return;
      }

      await api.post('/transacoes', novaTransacao);
      
      onAcaoConcluida();
      setNovaTransacao({
        descricao: '',
        valor: 0,
        tipo: TipoTransacao.Receita,
        pessoaId: 0,
      });
    } catch (error: any) {
      console.error('Erro ao adicionar transação:', error);
      alert(error.response?.data || "Erro ao adicionar transação.");
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <h2>Gerenciar Transações</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Descrição"
          value={novaTransacao.descricao}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor"
          value={novaTransacao.valor || ''}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: Number(e.target.value) })}
        />
        <select
          value={novaTransacao.tipo}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: Number(e.target.value) as TipoTransacao })}
        >
          <option value={TipoTransacao.Receita}>Receita</option>
          <option value={TipoTransacao.Despesa}>Despesa</option>
        </select>
        <select
          value={novaTransacao.pessoaId}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, pessoaId: Number(e.target.value) })}
        >
          <option value={0}>Selecione uma pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>
        <button onClick={handleAdicionar}>Adicionar</button>
      </div>

      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.descricao} - R$ {transacao.valor.toFixed(2)} - 
            {transacao.tipo === TipoTransacao.Receita ? ' Receita' : ' Despesa'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GerenciarTransacoes;