using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Untuk DbContext dan ToListAsync()
using Domain; // Pastikan ini sesuai dengan namespace definisi 'Activity'
using Persistence;
using MediatR;
using Application.Activities; // Pastikan ini sesuai dengan namespace definisi 'DataContext'


namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet] //api/activities

        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            // return await _context.Activities.FindAsync(id);
            return await Mediator.Send(new Detail.Query{Id = id});
        }

        [HttpPost("tambah")]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            await Mediator.Send(new Create.Command { activity = activity });
            return Ok();
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, [FromBody] Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command{activity = activity});
            return Ok();
        }

        // [HttpDelete("delete/{id}")]

        // public async Task<ActionResult> DeleteActivity(Guid id)
        // {
        //     var activityToDelete = _context.Activities.Find(id);
        //     if (activityToDelete != null)
        //     {
        //         _context.Activities.Remove(activityToDelete);
        //        await _context.SaveChangesAsync();
        //         return NoContent();
        //     }else{
        //         return NotFound();
        //     }
        // }
    }
}