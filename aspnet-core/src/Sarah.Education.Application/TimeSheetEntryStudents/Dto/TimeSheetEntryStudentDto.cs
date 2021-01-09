using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.TimeSheetEntryStudents.Dto
{
    [AutoMapFrom(typeof(TimeSheetEntryStudent))]
    [AutoMapTo(typeof(TimeSheetEntryStudent))]
    public class TimeSheetEntryStudentDto : EntityDto<Guid>
    {
        public Guid StudentId { get; set; }
        public Guid TimeSheetEntryId { get; set; }
        public int? Attitude { get; set; }
        public int? ReceptiveAbility { get; set; }
        public string Description { get; set; }
        public double Fee { get; set; }
        public bool? isPaid { get; set; }
        public StudentDto Student { get; set; }
    }
}
