import { useState, useEffect } from 'react';
import type { TotaisResponse } from '../types';
import api from '../services/api'; 

interface VisaoTotaisProps {
  atualizarTrigger: number;
}

const VisaoTotais = ({ atualizarTrigger }: VisaoTotaisProps) => {
  const [totais, setTotais] = useState<TotaisResponse | null>(null);

  useEffect(() => {
    const fetchTotais = async () => {
      try {
        const response = await api.get<TotaisResponse>('/totais');
        setTotais(response.data);
      } catch (error) {
        console.error('Erro ao buscar totais:', error);
      }
    };
    fetchTotais();
  }, [atualizarTrigger]);

  if (!totais) {
    return <div>Carregando totais...</div>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <h2>Visão de Totais</h2>
      
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4', borderRadius: '4px' }}>
        <h3>Total Geral</h3>
        <p>Receitas: R$ {totais.totalGeral.totalReceitas.toFixed(2)}</p>
        <p>Despesas: R$ {totais.totalGeral.totalDespesas.toFixed(2)}</p>
        <p style={{ fontWeight: 'bold' }}>
          Saldo Líquido: R$ {totais.totalGeral.saldoLiquido.toFixed(2)}
        </p>
      </div>

      <div>
        <h3>Totais por Pessoa</h3>
        {totais.totaisPorPessoa.length > 0 ? (
          totais.totaisPorPessoa.map((pessoa, index) => (
            <div key={index} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0' }}>
              <h4>{pessoa.nome}</h4>
              <p>Receitas: R$ {pessoa.totalReceitas.toFixed(2)}</p>
              <p>Despesas: R$ {pessoa.totalDespesas.toFixed(2)}</p>
              <p style={{ fontWeight: 'bold' }}>Saldo: R$ {pessoa.saldo.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma pessoa cadastrada ou transações realizadas.</p>
        )}
      </div>
    </div>
  );
};

export default VisaoTotais;