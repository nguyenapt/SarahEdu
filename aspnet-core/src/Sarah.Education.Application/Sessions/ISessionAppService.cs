using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Sessions.Dto;

namespace Sarah.Education.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
