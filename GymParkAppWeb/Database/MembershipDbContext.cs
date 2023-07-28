using GymParkAppWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace GymParkAppWeb.Database
{
    public class MembershipDbContext : DbContext
    {
        public DbSet<Membership> Memberships { get; set; }

        public DbSet<User> Users { get; set; }

        public MembershipDbContext(DbContextOptions<MembershipDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuration des relations et des contraintes
            modelBuilder.Entity<Membership>()
                .HasOne(m => m.User)
                .WithMany()
                .HasForeignKey(m => m.Id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
    
