using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SarahEducation.Entities;

namespace SarahEducation.ClassCentrals.Dto
{
    [AutoMapFrom(typeof(ClassCentral))]
    [AutoMapTo(typeof(ClassCentral))]
    public class ClassCentralDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
