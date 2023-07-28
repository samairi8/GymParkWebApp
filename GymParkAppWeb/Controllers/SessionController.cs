using GymParkAppWeb.Database;
using GymParkAppWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymParkAppWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly SessionDbContext _dbContext;

        public SessionController(SessionDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetSessions()
        {
            var sessions = await _dbContext.Sessions
                .Include(s => s.Cours)
                .Include(s => s.Coach)
                .ToListAsync();

            return Ok(sessions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSession(int id)
        {
            var session = await _dbContext.Sessions
                .Include(s => s.Cours)
                .Include(s => s.Coach)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
            {
                return NotFound("Session not found");
            }

            return Ok(session);
        }
        [HttpPost]
        public async Task<IActionResult> CreateSession([FromBody] Session session)
        {
            // Assuming you have validation checks here

            // Get the corresponding Coach and Cours entities based on the provided coachId and courseId
            Coach coach = await _dbContext.Coaches.FindAsync(session.CoachId);
            Cours cours = await _dbContext.Courses.FindAsync(session.CoursId);

            // Make sure that the Coach and Cours entities exist
            if (coach == null || cours == null)
            {
                return NotFound("Coach or Course not found with the provided IDs.");
            }

            // Set the navigation properties of the Session entity
            session.Coach = coach;
            session.Cours = cours;

            // Add the session to the _dbContext.Sessions
            _dbContext.Sessions.Add(session);

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            // Return the created session with the CreatedAtAction result
            return CreatedAtAction(nameof(GetSession), new { id = session.Id }, session);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSession(int id, [FromBody] Session updatedSession)
        {
            var session = await _dbContext.Sessions
                .Include(s => s.Cours)
                .Include(s => s.Coach)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
            {
                return NotFound("Session not found");
            }

            // Assuming you have validation checks here
            session.Nom = updatedSession.Nom;
            session.DateHeureDebut = updatedSession.DateHeureDebut;
            session.DateHeureFin = updatedSession.DateHeureFin;
            session.CoachId = updatedSession.CoachId;
            session.CoursId = updatedSession.CoursId;

            await _dbContext.SaveChangesAsync();

            // Return the updated session in the response
            return Ok(session);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _dbContext.Sessions.FindAsync(id);

            if (session == null)
            {
                return NotFound("Session not found");
            }

            _dbContext.Sessions.Remove(session);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
