using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Protectors.Dto
{
    [AutoMapTo(typeof(Protector))]
    public class CreateProtectorDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int ProtectorType { get; set; }
        public bool IsActive { get; set; }

        public Guid[] StudentIds { get; set; }
    }
}
