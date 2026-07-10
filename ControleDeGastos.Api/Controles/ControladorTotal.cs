using ControleDeGastos.Api.Models;
using ControleDeGastos.Api.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ControleDeGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TotaisController : ControllerBase
    {
        private readonly ContextoAplicacao _context;

        public TotaisController(ContextoAplicacao context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTotais()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var totaisPorPessoa = pessoas.Select(p => 
            {
                var receitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);
                    
                var despesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                return new 
                {
                    Nome = p.Nome,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                };
            }).ToList();

            var totalGeralReceitas = totaisPorPessoa.Sum(p => p.TotalReceitas);
            var totalGeralDespesas = totaisPorPessoa.Sum(p => p.TotalDespesas);
            var saldoLiquidoGeral = totalGeralReceitas - totalGeralDespesas;

            return Ok(new 
            {
                TotaisPorPessoa = totaisPorPessoa,
                TotalGeral = new 
                {
                    TotalReceitas = totalGeralReceitas,
                    TotalDespesas = totalGeralDespesas,
                    SaldoLiquido = saldoLiquidoGeral
                }
            });
        }
    }
}