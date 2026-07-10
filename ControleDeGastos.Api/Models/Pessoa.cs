using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ControleDeGastos.Api.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }

        [JsonIgnore]
        public List<Transacao> Transacoes { get; set; } = new();
    }
}