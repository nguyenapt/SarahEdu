using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Rooms.Dto
{
    [AutoMapTo(typeof(Room))]
    public class CreateRoomDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? SortOrder { get; set; }
        public Guid CustomTenantId { get; set; }
    }

}
