# Sistema de Controle de Gastos Residenciais

Este projeto foi desenvolvido como solução para um desafio técnico de controle de gastos residenciais. A aplicação consiste em um sistema completo que gerencia o cadastro de pessoas, suas transações financeiras e apresenta um balanço consolidado de totais (receitas, despesas e saldo líquido).

## 🚀 Tecnologias Utilizadas

- **Back-end:** .NET (C#) com ASP.NET Core Web API e Entity Framework Core para persistência de dados.
- **Front-end:** React, TypeScript e Vite para uma interface performática e tipada.
- **Gerenciamento de Código:** Git e GitHub.

---

## 🧠 Lógica de Desenvolvimento e Funcionalidades

### 1. Cadastro de Pessoas
- **Gerenciamento Completo:** Implementadas as funções de criação, listagem e deleção de usuários. Cada pessoa possui um Identificador único (gerado de forma automática pelo banco de dados), Nome e Idade.
- **Deleção em Cascata (Cascade Delete):** Conforme exigido pelos requisitos, a exclusão de uma pessoa remove automaticamente todas as transações atreladas a ela. Essa integridade referencial foi garantida nativamente através do comportamento de chaves estrangeiras configurado no Entity Framework Core.

### 2. Cadastro de Transações e Regras de Negócio
- **Validação de Menoridade:** No endpoint de criação de transações (`TransacoesController`), foi implementada uma regra de negócio rígida: se a pessoa vinculada for menor de 18 anos, o sistema barra o cadastro de "Receitas", permitindo estritamente o registro de "Despesas".
- **Garantia de Existência:** Antes de persistir qualquer transação, o back-end valida se o `PessoaId` informado realmente existe no banco de dados, retornando um erro adequado (`404 Not Found`) caso não exista.
- **Otimização do Model Binding:** Foi aplicado um tratamento específico no Controller para anular referências automáticas de objetos (`transacao.Pessoa = null`), impedindo que o Entity Framework gerasse registros vazios com "0 anos" de forma indesejada no banco de dados durante o salvamento da transação.

### 3. Consulta de Totais e Saldos
- **Cálculo Consolidado:** A interface do Front-end calcula dinamicamente o total de receitas, despesas e o saldo individual de cada pessoa cadastrada.
- **Resumo Geral:** Ao final da tabela de listagem, o sistema exibe de forma clara o balanço macro do sistema: somatório de todas as receitas, todas as despesas e o saldo líquido geral de todas as residências mapeadas.

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
- .NET SDK (versão 6.0 ou superior)
- Node.js e npm instalados

### Passo a Passo

> **Atenção:** Como o projeto possui Front-end e Back-end, você precisará manter **dois terminais abertos** simultaneamente: um para o servidor da API e outro para o servidor do React.

1. **Clonar o Repositório:**
   ```bash
   git clone [https://github.com/misaelinacio/controle-de-gastos-desafio.git](https://github.com/misaelinacio/controle-de-gastos-desafio.git)
   ```

2. **Executar o Back-end (.NET):**
   ```bash
   cd ControleDeGastos.Api
   dotnet run
   ```

3. **Executar o Front-end (React + TypeScript):**
   ```bash
   cd ControleDeGastos.Front
   npm install
   npm run dev
   ```


   
