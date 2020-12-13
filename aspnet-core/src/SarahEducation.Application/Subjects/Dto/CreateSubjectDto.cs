using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SarahEducation.Entities;

namespace SarahEducation.Subjects.Dto
{
    [AutoMapTo(typeof(Subject))]
    public class CreateSubjectDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

}
