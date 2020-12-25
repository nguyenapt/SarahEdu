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

namespace Sarah.Education.TimeSheetEntries
{
    public class TimeSheetEntryAppService : AsyncCrudAppService<TimeSheetEntry, TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>, ITimeSheetEntryAppService
    {
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetEntryRepository;
        private readonly IRepository<Course, Guid> _courseRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TimeSheetEntryAppService(IRepository<TimeSheetEntry, Guid> timeSheetEntryRepository, IRepository<Course, Guid> courseRepository, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryRepository)
        {
            _timeSheetEntryRepository = timeSheetEntryRepository;
            _courseRepository = courseRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task<List<CourseWithSubjectDto>> GetCourseWithSubject()
        {
            var courses = _courseRepository.GetAllIncluding(x => x.CourseSubjects);

            return courses.Select(x=> new CourseWithSubjectDto()
            {
                Name = x.Name,
                Description = x.Description,
                CourseSubjects = x.CourseSubjects.Select(k=> new CourseSubjectDto()
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