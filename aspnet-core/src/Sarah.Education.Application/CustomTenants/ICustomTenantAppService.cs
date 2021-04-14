using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.CustomTenants.Dto;

namespace Sarah.Education.CustomTenants
{
    public interface ICustomTenantAppService : IAsyncCrudAppService<CustomTenantDto, Guid, CustomTenantResultRequestDto, CreateCustomTenantDto, CustomTenantDto>
    {

    }
}


