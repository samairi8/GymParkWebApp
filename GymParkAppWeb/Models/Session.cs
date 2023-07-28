namespace GymParkAppWeb.Models
{
    public class Session
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public DateTime DateHeureDebut { get; set; } // Ajoutez la propriété "dateHeureDebut"
        public DateTime DateHeureFin { get; set; } // Ajoutez la propriété "dateHeureFin"

        // Clé étrangère pour le Cours associé
        public int CoursId { get; set; }
        public Cours Cours { get; set; }

        // Autres propriétés selon les besoins

        public int CoachId { get; set; }
        public Coach Coach { get; set; }

    }

    }
