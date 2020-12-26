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
using Abp.Application.Services.Dto;
using Sarah.Education.Courses.Dto;
using Sarah.Education.Students.Dto;
using Sarah.Education.TimeSheetEntryStudents.Dto;

namespace Sarah.Education.TimeSheetEntries
{
    public class TimeSheetEntryAppService : AsyncCrudAppService<TimeSheetEntry, TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>, ITimeSheetEntryAppService
    {
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetEntryRepository;
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetEntryStudentRepository;
        private readonly IRepository<Course, Guid> _courseRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TimeSheetEntryAppService(IRepository<TimeSheetEntry, Guid> timeSheetEntryRepository, IRepository<Course, Guid> courseRepository, IRepository<TimeSheetEntryStudent, Guid> timeSheetEntryStudentRepository, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryRepository)
        {
            _timeSheetEntryRepository = timeSheetEntryRepository;
            _timeSheetEntryStudentRepository = timeSheetEntryStudentRepository;
            _courseRepository = courseRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<TimeSheetEntryDto> CreateAsync(CreateTimeSheetEntryDto input)
        {
            CheckCreatePermission();

            var timeSheet = ObjectMapper.Map<TimeSheetEntry>(input);

            var timeSheetId = await _timeSheetEntryRepository.InsertAndGetIdAsync(timeSheet);

            if (input.TimeSheetStudents != null)
            {
                CreateTimeSheetStudents(timeSheetId, input.TimeSheetStudents);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(timeSheet);
        }

        public async void CreateTimeSheetStudents(Guid timeSheetId, TimeSheetEntryStudentDto[] timeSheetEntryStudents)
        {
            foreach (var timeSheetStudent in timeSheetEntryStudents)
            {
                var obj = new TimeSheetEntryStudent
                {
                    Id = Guid.NewGuid(),
                    TimeSheetEntryId = timeSheetId,
                    StudentId = timeSheetStudent.StudentId,
                    Fee = timeSheetStudent.Fee
                };
                await _timeSheetEntryStudentRepository.InsertAsync(obj);
            }
        }

        public async Task<List<CourseWithSubjectDto>> GetCourseWithSubject()
        {
            var courses = _courseRepository.GetAllIncluding(x => x.CourseSubjects);

            return courses.Select(x => new CourseWithSubjectDto()
            {
                Name = x.Name,
                Description = x.Description,
                CourseSubjects = x.CourseSubjects.Select(k => new CourseSubjectDto()
                {
                    Id = k.Id,
                    CourseId = k.CourseId,
                    SubjectId = k.SubjectId,
                    CourseName = k.Course.Name,
                    SubjectName = k.Subject.Name
                }).ToArray()
            }).ToList();
        }
    }
}