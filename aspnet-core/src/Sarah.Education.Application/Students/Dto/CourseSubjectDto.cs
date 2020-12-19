using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

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
    }
}
