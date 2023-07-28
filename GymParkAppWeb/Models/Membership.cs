using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GymParkAppWeb.Models
{
    public class Membership
    {
        [Key]
        public int MemberId { get; set; }

        [ForeignKey("Users")]
        public int Id { get; set; }

        public string Type { get; set; }

        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        public string Status { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; }

        public virtual User User { get; set; }
    }
}
