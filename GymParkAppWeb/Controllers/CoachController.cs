using GymParkAppWeb.Database;
using GymParkAppWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymParkAppWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachController : ControllerBase
    {
        private readonly SessionDbContext _dbContext;

        public CoachController(SessionDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetCoaches()
        {
            var coaches = await _dbContext.Coaches.ToListAsync();
            return Ok(coaches);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCoach(int id)
        {
            var coach = await _dbContext.Coaches
                 .FirstOrDefaultAsync(c => c.Id == id);

            if (coach == null)
            {
                return NotFound("Coach not found");
            }

            return Ok(coach);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCoach([FromBody] Coach coach)
        {
            // Remove the following line if you were setting the Id explicitly
            // coach.Id = 0;

            // Assuming you have validation checks here
            _dbContext.Coaches.Add(coach);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCoach), new { id = coach.Id }, coach);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCoach(int id, [FromBody] Coach updatedCoach)
        {
            var coach = await _dbContext.Coaches.FindAsync(id);

            if (coach == null)
            {
                return NotFound("Coach not found");
            }

            // Assuming you have validation checks here
            coach.Nom = updatedCoach.Nom;
            coach.Adresse = updatedCoach.Adresse;
            coach.Specialite = updatedCoach.Specialite;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoach(int id)
        {
            var coach = await _dbContext.Coaches.FindAsync(id);

            if (coach == null)
            {
                return NotFound("Coach not found");
            }

            _dbContext.Coaches.Remove(coach);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

