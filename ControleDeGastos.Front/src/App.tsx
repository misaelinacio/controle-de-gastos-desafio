import { useState } from 'react';
import VisaoTotais from './components/VisaoTotais'; 
import GerenciarPessoas from './components/GerenciarPessoas';
import GerenciarTransacoes from './components/GerenciarTransacoes'; 

function App() {
  const [atualizarTrigger, setAtualizarTrigger] = useState(0);

  function forcarAtualizacao() {
    setAtualizarTrigger(prev => prev + 1);
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Controle de Gastos Residenciais</h1>
      
      <GerenciarPessoas onAcaoConcluida={forcarAtualizacao} atualizarTrigger={atualizarTrigger} />
      <GerenciarTransacoes onAcaoConcluida={forcarAtualizacao} atualizarTrigger={atualizarTrigger} />
      <VisaoTotais atualizarTrigger={atualizarTrigger} />
    </div>
  );
}

export default App;