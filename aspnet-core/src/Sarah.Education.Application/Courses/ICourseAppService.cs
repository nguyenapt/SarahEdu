using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Courses.Dto;
using Sarah.Education.Rooms.Dto;

namespace Sarah.Education.Courses
{
    public interface ICourseAppService : IAsyncCrudAppService<CourseDto, Guid, CourseResultRequestDto, CreateCourseDto, CourseDto>
    {

    }
}


