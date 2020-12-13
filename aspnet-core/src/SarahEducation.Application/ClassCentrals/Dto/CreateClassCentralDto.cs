using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SarahEducation.Entities;

namespace SarahEducation.ClassCentrals.Dto
{
    [AutoMapTo(typeof(ClassCentral))]
    public class CreateClassCentralDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

}
