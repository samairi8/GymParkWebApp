using GymParkAppWeb.Database;
using GymParkAppWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymParkAppWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext UserDbContext;

        public UserController(UserDbContext userDbContext)
        {
            this.UserDbContext = userDbContext;

        }
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var Users = await UserDbContext.Users.ToListAsync();
            return Ok(Users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            user.Id = new int();
            await UserDbContext.Users.AddAsync(user);
            await UserDbContext.SaveChangesAsync();
            return Ok(user);
                }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            var existingUser = await UserDbContext.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound("User not found");
            }

            existingUser.Nom = user.Nom;
            existingUser.Prenom = user.Prenom;
            existingUser.Email = user.Email;
            existingUser.Date = user.Date;
            existingUser.Ville = user.Ville;
            existingUser.code_postal = user.code_postal;

            await UserDbContext.SaveChangesAsync();

            return Ok(existingUser);
        }




        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var existingUser = await UserDbContext.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound("User not found");
            }

            UserDbContext.Users.Remove(existingUser);
            await UserDbContext.SaveChangesAsync();

            return Ok(existingUser);
        }


    }
}
