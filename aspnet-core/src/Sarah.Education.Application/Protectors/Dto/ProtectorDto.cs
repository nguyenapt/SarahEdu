using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.Protectors.Dto
{
    [AutoMapFrom(typeof(Protector))]
    [AutoMapTo(typeof(Protector))]
    public class ProtectorDto : EntityDto<Guid>
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int ProtectorType { get; set; }
        public bool IsActive { get; set; }
        public StudentDto[] Students { get; set; }
    }
}
