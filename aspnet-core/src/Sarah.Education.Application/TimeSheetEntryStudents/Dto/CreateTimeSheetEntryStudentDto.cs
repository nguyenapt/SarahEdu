using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.TimeSheetEntryStudents.Dto
{
    [AutoMapTo(typeof(TimeSheetEntryStudent))]
    public class CreateTimeSheetEntryStudentDto
    {
        public Guid StudentId { get; set; }
        public Guid TimeSheetEntryId { get; set; }
        public int? Attitude { get; set; }
        public int? ReceptiveAbility { get; set; }
        public string Description { get; set; }
        public double Fee { get; set; }

    }
}
