using GymParkAppWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace GymParkAppWeb.Database
{
    public class SessionDbContext: DbContext
    {
        public SessionDbContext(DbContextOptions<SessionDbContext> options) : base(options)
        {
        }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Cours> Courses { get; set; }
        public DbSet<Coach> Coaches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Session>()
                            .HasOne(s => s.Cours)
                            .WithMany()
                            .HasForeignKey(s => s.CoursId);

            modelBuilder.Entity<Session>()
                .HasOne(s => s.Coach)
                .WithMany()
                .HasForeignKey(s => s.CoachId);

            // Other configurations for other entities and their relationships

            base.OnModelCreating(modelBuilder);
        }
    }
}
