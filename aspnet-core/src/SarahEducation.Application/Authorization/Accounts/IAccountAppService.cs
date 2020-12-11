using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Authorization.Accounts.Dto;

namespace SarahEducation.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
