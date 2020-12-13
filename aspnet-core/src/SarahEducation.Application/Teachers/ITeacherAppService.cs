using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Protectors.Dto;
using SarahEducation.Teachers.Dto;

namespace SarahEducation.Teachers
{
    public interface ITeacherAppService : IAsyncCrudAppService<TeacherDto, Guid, TeacherResultRequestDto, CreateTeacherDto, TeacherDto>
    {
    }
}


