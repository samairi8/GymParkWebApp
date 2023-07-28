using System;
using System.Linq;
using System.Threading.Tasks;
using GymParkAppWeb.Database;
using GymParkAppWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymParkAppWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController : ControllerBase
    {
        private readonly MembershipDbContext _dbContext;

        public MembershipController(MembershipDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetMemberships()
        {
            var memberships = await _dbContext.Memberships
                .Include(m => m.User)
                .ToListAsync();

            return Ok(memberships);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMembership(int id)
        {
            var membership = await _dbContext.Memberships
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.MemberId == id);

            if (membership == null)
            {
                return NotFound("Membership not found");
            }

            return Ok(membership);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMembership([FromBody] Membership membership)
        {
            var user = await _dbContext.Users.FindAsync(membership.Id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            membership.StartDate = membership.StartDate;
            membership.EndDate = membership.EndDate;
            membership.Type = membership.Type;
            membership.Status = membership.Status;
            membership.CreatedAt = DateTime.Now;
            membership.UpdatedAt = DateTime.Now;
            membership.User = user;

            _dbContext.Memberships.Add(membership);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMembership), new { id = membership.MemberId }, membership);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateMembership(int id, [FromBody] Membership updatedMembership)
        {
            var membership = await _dbContext.Memberships.FindAsync(id);
            if (membership == null)
            {
                return NotFound("Membership not found");
            }

            membership.StartDate = updatedMembership.StartDate;
            membership.EndDate = updatedMembership.EndDate;
            membership.Type = updatedMembership.Type;
            membership.Status = updatedMembership.Status;
            membership.UpdatedAt = DateTime.Now;

            var user = await _dbContext.Users.FindAsync(updatedMembership.Id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            membership.User = user;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMembership(int id)
        {
            var membership = await _dbContext.Memberships.FindAsync(id);
            if (membership == null)
            {
                return NotFound("Membership not found");
            }

            _dbContext.Memberships.Remove(membership);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
