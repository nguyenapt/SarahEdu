using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Courses.Dto;
using Sarah.Education.Entities;
using Sarah.Education.Protectors.Dto;
using Sarah.Education.Students.Dto;
using Sarah.Education.Teachers.Dto;

namespace Sarah.Education.TimeSheetEntryStudents.Dto
{
    public class TimeSheetEntryStudentStatusDto
    {
        public Guid Id { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string RoomName { get; set; }
        public TeacherDto Teacher { get; set; }
        public CourseSubjectDto CourseSubject { get; set; }

        public Guid StudentId { get; set; }
        public int? Attitude { get; set; }
        public int? ReceptiveAbility { get; set; }
        public string Description { get; set; }
        public StudentDto Student { get; set; }        
    }
}
