using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.TimeSheetEntryStudents.Dto;

namespace Sarah.Education.TimeSheetEntryStudents
{
    public interface ITimeSheetEntryStudentAppService : IAsyncCrudAppService<TimeSheetEntryStudentDto, Guid, TimeSheetEntryStudentResultRequestDto, CreateTimeSheetEntryStudentDto, TimeSheetEntryStudentDto>
    {
        Task<TimeSheetEntryStudentDto> CreateOrUpdateTimeSheetStudent(TimeSheetEntryStudentDto timeSheetEntryStudent);
    }
}


