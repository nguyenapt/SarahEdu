using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SarahEducation.Entities;

namespace SarahEducation.CourseFees.Dto
{
    [AutoMapFrom(typeof(CourseFee))]
    [AutoMapTo(typeof(CourseFee))]
    public class CourseFeeDto : EntityDto<Guid>
    {
        public double Fee { get; set; }
        public Guid CourseId { get; set; }
        public int? Year { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsSingle { get; set; }
    }
}
