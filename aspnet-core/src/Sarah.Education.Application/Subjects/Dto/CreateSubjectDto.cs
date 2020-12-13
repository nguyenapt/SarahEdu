using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Subjects.Dto
{
    [AutoMapTo(typeof(Subject))]
    public class CreateSubjectDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

}
