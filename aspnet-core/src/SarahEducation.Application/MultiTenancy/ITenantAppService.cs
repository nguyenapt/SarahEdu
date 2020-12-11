using Abp.Application.Services;
using SarahEducation.MultiTenancy.Dto;

namespace SarahEducation.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

