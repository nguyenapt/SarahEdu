﻿using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Protectors.Dto
{
    [AutoMapTo(typeof(Protector))]
    public class CreateProtectorDto
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int ProtectorType { get; set; }
        public bool IsActive { get; set; }

        public Guid[] StudentIds { get; set; }
    }
}
