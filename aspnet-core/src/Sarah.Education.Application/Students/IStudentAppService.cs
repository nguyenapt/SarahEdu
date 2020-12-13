using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Protectors.Dto;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.Students
{
    public interface IStudentAppService : IAsyncCrudAppService<StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>
    {
    }
}


