using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Untuk DbContext dan ToListAsync()
using Domain; // Pastikan ini sesuai dengan namespace definisi 'Activity'

using Application.Activities;
using Application.DTO; // Pastikan ini sesuai dengan namespace definisi 'DataContext'


namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet] //api/activities

        public async Task<IActionResult> GetActivities()
        {
            return handleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            // return await _context.Activities.FindAsync(id);
            return handleResult(await Mediator.Send(new Detail.Query { Id = id }));
        }

        [HttpPost("tambah")]
        public async Task<IActionResult> CreateActivity([FromBody]ActivityDTO activity)
        {
            await Mediator.Send(new Create.Command { activity = activity });
            return Ok();
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, [FromBody] ActivityDTO activity)
        {
            return handleResult(await Mediator.Send(new Edit.Command { activity = activity, id = id }));
        }

        [HttpDelete("delete/{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return handleResult(await Mediator.Send(new Delete.Command { id = id }));
            
        }
    }
}