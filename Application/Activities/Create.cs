using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTO;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public ActivityDTO activity {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _imapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _imapper = mapper;

            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = _imapper.Map<Activity>(request.activity); 
                _context.Activities.Add(activity);
                await _context.SaveChangesAsync();
            }
        }

    }
}