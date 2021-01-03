using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.CourseFees.Dto
{
    [AutoMapFrom(typeof(CourseFee))]
    [AutoMapTo(typeof(CourseFee))]
    public class CourseFeeDto : EntityDto<Guid>
    {
        public double Fee { get; set; }
        public double FeeMultiple { get; set; }
        public Guid CourseId { get; set; }
        public int? Year { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? ActiveFrom { get; set; }
    }
}
