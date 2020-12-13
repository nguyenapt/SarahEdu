using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.TimeSheetEntryStudents.Dto
{
    [AutoMapTo(typeof(TimeSheetEntry))]
    public class CreateTimeSheetEntryStudentDto
    {
        public Guid StudentId { get; set; }
        public Guid TimeSheetEntryId { get; set; }
        public string Attitude { get; set; }
        public string ReceptiveAbility { get; set; }
        public string Description { get; set; }
    }
}
