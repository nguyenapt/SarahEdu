using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.ClassCentrals.Dto;
using SarahEducation.Rooms.Dto;

namespace SarahEducation.ClassCentrals
{
    public interface IClassCentralAppService : IAsyncCrudAppService<ClassCentralDto, Guid, ClassCentralResultRequestDto, CreateClassCentralDto, ClassCentralDto>
    {

    }
}


