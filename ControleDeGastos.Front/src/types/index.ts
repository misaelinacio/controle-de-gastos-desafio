export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export const TipoTransacao = {
  Despesa: 0,
  Receita: 1
} as const;

export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

export interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
}

export interface TotaisResponse {
  totaisPorPessoa: {
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  }[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
  };
}