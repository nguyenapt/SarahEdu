using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.TimeSheetEntryStudents.Dto;

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
        public int Status { get; set; }
        public TimeSheetEntryStudentDto[] TimeSheetStudents { get; set; }
    }
}
