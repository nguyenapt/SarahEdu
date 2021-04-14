using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.StudyTimes.Dto;
using Sarah.Education.TimeSheetEntries.Dto;

namespace Sarah.Education.CustomTenants.Dto
{
    [AutoMapFrom(typeof(CustomTenant))]
    [AutoMapTo(typeof(CustomTenant))]
    public class CustomTenantDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
