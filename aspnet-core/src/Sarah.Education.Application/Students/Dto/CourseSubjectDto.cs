using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Courses.Dto;
using Sarah.Education.Entities;
using Sarah.Education.Subjects.Dto;

namespace Sarah.Education.Students.Dto
{
    [AutoMapFrom(typeof(CourseSubject))]
    [AutoMapTo(typeof(CourseSubject))]
    public class CourseSubjectDto : EntityDto<Guid>
    {
        public Guid CourseId { get; set; }
        public Guid SubjectId { get; set; }
        public string CourseName { get; set; }
        public string SubjectName { get; set; }
        public CourseDto Course { get; set; }
        public SubjectDto Subject { get; set; }
    }
}
