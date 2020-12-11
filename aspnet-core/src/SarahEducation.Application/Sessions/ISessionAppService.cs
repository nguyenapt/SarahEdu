using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Sessions.Dto;

namespace SarahEducation.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
