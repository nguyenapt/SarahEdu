using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Protectors.Dto;

namespace Sarah.Education.Protectors
{
    public interface IProtectorAppService : IAsyncCrudAppService<ProtectorDto, Guid, ProtectorResultRequestDto, CreateProtectorDto, ProtectorDto>
    {
    }
}


