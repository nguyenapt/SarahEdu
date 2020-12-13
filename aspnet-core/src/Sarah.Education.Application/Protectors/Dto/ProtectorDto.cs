﻿using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Protectors.Dto
{
    [AutoMapFrom(typeof(Protector))]
    [AutoMapTo(typeof(Protector))]
    public class ProtectorDto : EntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int ProtectorType { get; set; }
        public bool IsActive { get; set; }
    }
}
