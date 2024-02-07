using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Untuk DbContext dan ToListAsync()
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain; // Pastikan ini sesuai dengan namespace definisi 'Activity'
using Persistence; // Pastikan ini sesuai dengan namespace definisi 'DataContext'


namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
         _context = context;   
        }

        [HttpGet] //api/activities

        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            var activityToDelete = _context.Activities.Find(id);
            if (activityToDelete != null)
            {
                _context.Activities.Remove(activityToDelete);
               await _context.SaveChangesAsync();
                return NoContent();
            }else{
                return NotFound();
            }
        }
    }
}