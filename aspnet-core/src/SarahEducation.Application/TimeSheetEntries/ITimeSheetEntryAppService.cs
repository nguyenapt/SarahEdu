using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.TimeSheetEntries.Dto;

namespace SarahEducation.TimeSheetEntries
{
    public interface ITimeSheetEntryAppService : IAsyncCrudAppService<TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>
    {
    }
}


