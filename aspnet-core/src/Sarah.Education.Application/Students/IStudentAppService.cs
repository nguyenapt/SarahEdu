﻿using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Sarah.Education.Protectors.Dto;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.Students
{
    public interface IStudentAppService : IAsyncCrudAppService<StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>
    {
        Task<ListResultDto<CourseSubjectDto>> GetCourseSubjects();

        Task<ListResultDto<StudentDto>> GetStudents();
    }
}


