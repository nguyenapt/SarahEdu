using Abp.Application.Services;
using Sarah.Education.MultiTenancy.Dto;

namespace Sarah.Education.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

