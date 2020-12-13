using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Courses.Dto;
using SarahEducation.Rooms.Dto;

namespace SarahEducation.Courses
{
    public interface ICourseAppService : IAsyncCrudAppService<CourseDto, Guid, CourseResultRequestDto, CreateCourseDto, CourseDto>
    {

    }
}


