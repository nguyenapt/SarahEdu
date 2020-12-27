using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Sarah.Education.Courses.Dto;
using Sarah.Education.Entities;
using Sarah.Education.TimeSheetEntries.Dto;

namespace Sarah.Education.TimeSheetEntries
{
    public interface ITimeSheetEntryAppService : IAsyncCrudAppService<TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>
    {
        Task<List<CourseWithSubjectDto>> GetCourseWithSubject();

        Task<ListResultDto<TimeSheetEntryDto>> GetTimeSheetFromDateToDate(TimeSheetEntryResultRequestDto input);
    }
}