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
using Sarah.Education.TimeSheetEntryStudents.Dto;

namespace Sarah.Education.TimeSheetEntryStudents
{
    public class TimeSheetEntryStudentAppService : AsyncCrudAppService<TimeSheetEntryStudent, TimeSheetEntryStudentDto, Guid, TimeSheetEntryStudentResultRequestDto, CreateTimeSheetEntryStudentDto, TimeSheetEntryStudentDto>, ITimeSheetEntryStudentAppService
    {
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetEntryStudentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TimeSheetEntryStudentAppService(IRepository<TimeSheetEntryStudent, Guid> timeSheetEntryStudentRepository, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryStudentRepository)
        {
            _timeSheetEntryStudentRepository = timeSheetEntryStudentRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task<TimeSheetEntryStudentDto> CreateOrUpdateTimeSheetStudent(TimeSheetEntryStudentDto timeSheetEntryStudent)
        {
            CheckCreatePermission();           

            var timeSheetStudent = ObjectMapper.Map<TimeSheetEntryStudent>(timeSheetEntryStudent);

            if (timeSheetStudent.Id == Guid.Empty)
            {
                await _timeSheetEntryStudentRepository.InsertAsync(timeSheetStudent);
            }
            else
            {
                timeSheetStudent = await _timeSheetEntryStudentRepository.FirstOrDefaultAsync(x => x.Id == timeSheetEntryStudent.Id);

                MapToEntity(timeSheetEntryStudent, timeSheetStudent);

                await _timeSheetEntryStudentRepository.UpdateAsync(timeSheetStudent);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(timeSheetStudent);
        }
    }
}