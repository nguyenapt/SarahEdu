using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Authorization.Accounts.Dto;

namespace Sarah.Education.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
