using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Sarah.Education.Protectors.Dto;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.Students
{
    public interface IStudentAppService : IAsyncCrudAppService<StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>
    {
        Task<ListResultDto<StudentDto>> GetStudents();
        Task<PagedStudentFeeDto> GetStudentFees(StudentFeeResultRequestDto input);
        Task<StudentDto> GetStudentAndProtector(Guid input);
    }
}


