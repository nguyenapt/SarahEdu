using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SarahEducation.Entities;

namespace SarahEducation.Rooms.Dto
{
    [AutoMapTo(typeof(Room))]
    public class CreateRoomDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

}
