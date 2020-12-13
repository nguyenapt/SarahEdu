using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.TimeSheetEntryStudents.Dto
{
    [AutoMapFrom(typeof(TimeSheetEntry))]
    [AutoMapTo(typeof(TimeSheetEntry))]
    public class TimeSheetEntryStudentDto : EntityDto<Guid>
    {
        public Guid StudentId { get; set; }
        public Guid TimeSheetEntryId { get; set; }
        public string Attitude { get; set; }
        public string ReceptiveAbility { get; set; }
        public string Description { get; set; }
    }
}
