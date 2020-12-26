using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.ClassCentrals.Dto
{
    [AutoMapTo(typeof(ClassCentral))]
    public class CreateClassCentralDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public StudentDto[] Students { get; set; }
    }

}
