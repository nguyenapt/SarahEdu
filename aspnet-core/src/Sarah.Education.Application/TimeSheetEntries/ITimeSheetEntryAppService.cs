using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.TimeSheetEntries.Dto;

namespace Sarah.Education.TimeSheetEntries
{
    public interface ITimeSheetEntryAppService : IAsyncCrudAppService<TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>
    {
    }
}


