using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.TimeSheetEntries.Dto
{
    [AutoMapTo(typeof(TimeSheetEntry))]
    public class CreateTimeSheetEntryDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public Guid RoomId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid CourseSubjectId { get; set; }
        public double Fee { get; set; }
        public int Status { get; set; }
    }
}
