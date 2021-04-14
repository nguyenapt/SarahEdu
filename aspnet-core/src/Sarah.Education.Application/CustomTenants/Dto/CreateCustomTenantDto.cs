using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.CustomTenants.Dto
{
    [AutoMapTo(typeof(CustomTenant))]
    public class CreateCustomTenantDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

}
