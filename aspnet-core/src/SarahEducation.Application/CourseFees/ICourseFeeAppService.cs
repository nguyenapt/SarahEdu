using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.CourseFees.Dto;

namespace SarahEducation.CourseFees
{
    public interface ICourseFeeAppService : IAsyncCrudAppService<CourseFeeDto, Guid, CourseFeeResultRequestDto, CreateCourseFeeDto, CourseFeeDto>
    {

    }
}


