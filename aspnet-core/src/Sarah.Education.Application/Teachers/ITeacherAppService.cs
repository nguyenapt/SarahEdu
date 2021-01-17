using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Sarah.Education.Protectors.Dto;
using Sarah.Education.Teachers.Dto;

namespace Sarah.Education.Teachers
{
    public interface ITeacherAppService : IAsyncCrudAppService<TeacherDto, Guid, TeacherResultRequestDto, CreateTeacherDto, TeacherDto>
    {
        Task<ListResultDto<TeacherDto>> GetTeachers();
        Task<PagedTeacherProductivityDto> GetTeacherProductivity(TeacherProductivityResultRequestDto input);
    }
}


