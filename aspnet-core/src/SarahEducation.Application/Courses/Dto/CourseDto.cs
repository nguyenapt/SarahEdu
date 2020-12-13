using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SarahEducation.Entities;

namespace SarahEducation.Courses.Dto
{
    [AutoMapFrom(typeof(Course))]
    [AutoMapTo(typeof(Course))]
    public class CourseDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
