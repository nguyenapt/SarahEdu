using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.TimeSheetEntries.Dto;

namespace Sarah.Education.TimeSheetEntries
{
    public class TimeSheetEntryAppService : AsyncCrudAppService<TimeSheetEntry, TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>, ITimeSheetEntryAppService
    {
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetEntryRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TimeSheetEntryAppService(IRepository<TimeSheetEntry, Guid> timeSheetEntryRepository, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryRepository)
        {
            _timeSheetEntryRepository = timeSheetEntryRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }
    }
}