using ControleDeGastos.Api.Models;
using ControleDeGastos.Api.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleDeGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly ContextoAplicacao _context;

        public TransacoesController(ContextoAplicacao context)
        {
            _context = context;
        }

        /// <summary>

        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transacoes = await _context.Transacoes.ToListAsync();
            return Ok(transacoes);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create(Transacao transacao)
        {
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            
            if (pessoa == null) 
            {
                return NotFound("Pessoa informada não existe no sistema.");
            }

            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
            {
                return BadRequest("Menores de 18 anos só podem registrar transações do tipo Despesa.");
            }

            transacao.Pessoa = null!;

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            
            return Ok(transacao);
        }
    }
}