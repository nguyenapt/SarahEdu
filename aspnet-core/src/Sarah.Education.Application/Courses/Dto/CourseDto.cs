using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.CourseFees.Dto;
using Sarah.Education.Entities;

namespace Sarah.Education.Courses.Dto
{
    [AutoMapFrom(typeof(Course))]
    [AutoMapTo(typeof(Course))]
    public class CourseDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] Subjects { get; set; }
        public CourseFeeDto[] CourseFees { get; set; }

    }
}
