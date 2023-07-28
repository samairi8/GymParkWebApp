using GymParkAppWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace GymParkAppWeb.Database
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
            // Constructor implementation
        }


        public DbSet<User> Users { get; set; }
    }
}
