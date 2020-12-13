using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Protectors.Dto;
using SarahEducation.Students.Dto;

namespace SarahEducation.Students
{
    public interface IStudentAppService : IAsyncCrudAppService<StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>
    {
    }
}


