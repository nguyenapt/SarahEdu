using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SarahEducation.Entities;

namespace SarahEducation.Subjects.Dto
{
    [AutoMapFrom(typeof(Subject))]
    [AutoMapTo(typeof(Subject))]
    public class SubjectDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
