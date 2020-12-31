using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Sarah.Education.Courses.Dto;
using Sarah.Education.Subjects.Dto;

namespace Sarah.Education.Courses
{
    public interface ICourseAppService : IAsyncCrudAppService<CourseDto, Guid, CourseResultRequestDto, CreateCourseDto, CourseDto>
    {
        Task<ListResultDto<CourseSubjectDto>> GetCourseSubjects();
        Task<List<CourseWithSubjectDto>> GetCourseWithSubject();
        
    }
}


