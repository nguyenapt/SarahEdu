using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.CourseFees.Dto;

namespace Sarah.Education.CourseFees
{
    public interface ICourseFeeAppService : IAsyncCrudAppService<CourseFeeDto, Guid, CourseFeeResultRequestDto, CreateCourseFeeDto, CourseFeeDto>
    {

    }
}


