using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.Subjects.Dto;

namespace Sarah.Education.Courses.Dto
{
    [AutoMapFrom(typeof(CourseSubject))]
    [AutoMapTo(typeof(CourseSubject))]
    public class CourseSubjectDto : EntityDto<Guid>
    {
        public Guid CourseId { get; set; }
        public Guid SubjectId { get; set; }
        public string CourseName { get; set; }
        public string SubjectName { get; set; }
    }
}
