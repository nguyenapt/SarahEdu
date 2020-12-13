using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Protectors.Dto;

namespace SarahEducation.Protectors
{
    public interface IProtectorAppService : IAsyncCrudAppService<ProtectorDto, Guid, ProtectorResultRequestDto, CreateProtectorDto, ProtectorDto>
    {
    }
}


