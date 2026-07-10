using ControleDeGastos.Api.Models;
using ControleDeGastos.Api.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleDeGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly ContextoAplicacao _context;

        public PessoasController(ContextoAplicacao context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var pessoas = await _context.Pessoas.ToListAsync();
            return Ok(pessoas);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return Ok(pessoa);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            
            if (pessoa == null) 
                return NotFound("Pessoa não encontrada no sistema.");

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}