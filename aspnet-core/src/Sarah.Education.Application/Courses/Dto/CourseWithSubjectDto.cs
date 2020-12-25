using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.Courses.Dto
{
    public class CourseWithSubjectDto
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public CourseSubjectDto[] CourseSubjects { get; set; }
    }
}
