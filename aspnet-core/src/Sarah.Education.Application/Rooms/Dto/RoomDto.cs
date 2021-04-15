using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.CustomTenants.Dto;
using Sarah.Education.Entities;
using Sarah.Education.StudyTimes.Dto;
using Sarah.Education.TimeSheetEntries.Dto;

namespace Sarah.Education.Rooms.Dto
{
    [AutoMapFrom(typeof(Room))]
    [AutoMapTo(typeof(Room))]
    public class RoomDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public CustomTenantDto CustomTenant { get; set; }
        public List<StudyTimeInWeekDto> StudyTimes { get; set; } = new List<StudyTimeInWeekDto>();
    }
}
