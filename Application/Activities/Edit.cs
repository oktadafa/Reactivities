using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity activity {get;set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.activity.Id);

                activity.Title = request.activity.Title ?? activity.Title;
                activity.Venue = request.activity.Venue ?? activity.Venue;
                activity.City = request.activity.City ?? activity.City;
                activity.Category  = request.activity.Category ?? activity.Category;
                activity.Description = request.activity.Description ?? activity.Description;

                await _context.SaveChangesAsync(); 
            }
        }
    }
}