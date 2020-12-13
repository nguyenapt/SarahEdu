using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.CourseFees.Dto
{
    [AutoMapTo(typeof(CourseFee))]
    public class CreateCourseFeeDto
    {
        public double Fee { get; set; }
        public Guid CourseId { get; set; }
        public int Year { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsSingle { get; set; }
    }
}
