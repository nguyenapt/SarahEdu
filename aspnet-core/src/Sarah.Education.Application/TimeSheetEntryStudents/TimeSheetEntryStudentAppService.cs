using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Microsoft.EntityFrameworkCore;
using Sarah.Education.Students.Dto;
using Sarah.Education.Teachers.Dto;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.TimeSheetEntryStudents.Dto;

namespace Sarah.Education.TimeSheetEntryStudents
{
    public class TimeSheetEntryStudentAppService : AsyncCrudAppService<TimeSheetEntryStudent, TimeSheetEntryStudentDto, Guid, TimeSheetEntryStudentResultRequestDto, CreateTimeSheetEntryStudentDto, TimeSheetEntryStudentDto>, ITimeSheetEntryStudentAppService
    {
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetEntryStudentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly IRepository<Student, Guid> _studentRepository;
        public TimeSheetEntryStudentAppService(IRepository<TimeSheetEntryStudent, Guid> timeSheetEntryStudentRepository, IRepository<Student, Guid> studentRepository, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryStudentRepository)
        {
            _timeSheetEntryStudentRepository = timeSheetEntryStudentRepository;
            _studentRepository = studentRepository;
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

        public async Task<ListResultDto<TimeSheetEntryStudentStatusDto>> GetTimeSheetStudentStatus(TimeSheetStudentStatusResultRequestDto input)
        {
            var studentsTimeEntries = Repository.GetAllIncluding(x => x.TimeSheetEntry, x=>x.TimeSheetEntry.CourseSubject, x=>x.TimeSheetEntry.Teacher, x=>x.TimeSheetEntry.Room).AsEnumerable()
                .WhereIf(input.Attitude.HasValue, x => x.Attitude == input.Attitude || x.ReceptiveAbility == input.Attitude)
                .WhereIf(input.FromDate.HasValue, x => x.TimeSheetEntry.FromDate >= input.FromDate)
                .WhereIf(input.ToDate.HasValue, x => x.TimeSheetEntry.ToDate <= input.ToDate).ToList();
                
            var students = studentsTimeEntries.Select(x=> new TimeSheetEntryStudentStatusDto()
                {
                    ReceptiveAbility = x.ReceptiveAbility,
                    Attitude = x.Attitude,
                    FromDate = x.TimeSheetEntry.FromDate,
                    ToDate = x.TimeSheetEntry.ToDate,
                    CourseSubject = x.TimeSheetEntry.CourseSubject != null ? ObjectMapper.Map<Courses.Dto.CourseSubjectDto>(x.TimeSheetEntry.CourseSubject):null,
                    Description = x.Description,
                    Id = x.Id,
                    RoomName = x.TimeSheetEntry.Room?.Name,
                    Student = ObjectMapper.Map<StudentDto>(_studentRepository.FirstOrDefault(st => st.Id == x.StudentId)),
                    StudentId = x.StudentId,
                    Teacher = x.TimeSheetEntry.Teacher != null ? ObjectMapper.Map<TeacherDto>(x.TimeSheetEntry.Teacher): null
                }).ToList();

            return new ListResultDto<TimeSheetEntryStudentStatusDto>(students);
        }
    }
}