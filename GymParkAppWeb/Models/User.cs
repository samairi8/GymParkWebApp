using System.ComponentModel.DataAnnotations;

namespace GymParkAppWeb.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Nom { get; set; }

        public string Prenom { get; set; }

        public string Email { get; set; }
        public DateTime Date { get; set; }

        public string Ville { get; set; }
        public string code_postal { get; set; }





    }
}
