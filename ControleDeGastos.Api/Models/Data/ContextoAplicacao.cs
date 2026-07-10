using ControleDeGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleDeGastos.Api.Models.Data
{
    public class ContextoAplicacao : DbContext
    {
        public ContextoAplicacao(DbContextOptions<ContextoAplicacao> options) : base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pessoa>()
                .HasMany(p => p.Transacoes) 
                .WithOne(t => t.Pessoa)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}