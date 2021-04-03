using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.Teachers.Dto;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.Application.Services.Dto;

namespace Sarah.Education.Teachers
{
    public class TeacherAppService : AsyncCrudAppService<Teacher, TeacherDto, Guid, TeacherResultRequestDto, CreateTeacherDto, TeacherDto>, ITeacherAppService
    {
        private readonly IRepository<Teacher, Guid> _teacherRepository;
        private readonly IRepository<TimeSheetEntry, Guid> _timesheetRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TeacherAppService(IRepository<Teacher, Guid> teacherRepository, IRepository<TimeSheetEntry, Guid> timesheetRepository, IUnitOfWorkManager unitOfWorkManager) : base(teacherRepository)
        {
            _teacherRepository = teacherRepository;
            _timesheetRepository = timesheetRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public override async Task<TeacherDto> CreateAsync(CreateTeacherDto input)
        {
            CheckCreatePermission();

            var teacher = ObjectMapper.Map<Teacher>(input);

            teacher.UserId = input.UserId;

            await Repository.InsertAsync(teacher);            

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(teacher);
        }

        public async Task<ListResultDto<TeacherDto>> GetTeachers()
        {
            var teachers = Repository.GetAllList();
            return new ListResultDto<TeacherDto>(ObjectMapper.Map<List<TeacherDto>>(teachers));
        }

        protected override IQueryable<Teacher> ApplySorting(IQueryable<Teacher> query, TeacherResultRequestDto input)
        {
            return query.OrderBy(r => r.FullName);
        }

        protected override IQueryable<Teacher> CreateFilteredQuery(TeacherResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.FullName.Contains(input.Keyword) 
                       || x.Email.Contains(input.Keyword)
                       || x.Description.Contains(input.Keyword));
        }

        public async Task<PagedTeacherProductivityDto> GetTeacherProductivity(TeacherProductivityResultRequestDto input)
        {
            var list = _timesheetRepository.GetAllIncluding(
                x => x.Teacher,
                x => x.Room,
                x => x.CourseSubject.Course,
                x => x.CourseSubject.Subject,
                x => x.TimeSheetEntryStudents)
                .Where(x => x.TeacherId == input.TeacherId)
                .WhereIf(input.FromDate.HasValue, x => x.FromDate >= input.FromDate)
                .WhereIf(input.FromDate.HasValue, x => x.FromDate >= input.FromDate).ToList();

            var returnList = list
            .Skip(input.SkipCount)
            .Take(input.MaxResultCount)
            .Select(d => new TeacherProductivityDto
            {
                SubjectName = d.CourseSubject.Subject.Name,
                CourseName = d.CourseSubject.Course.Name,
                RoomName = d.Room.Name,
                StartDate = d.FromDate,
                EndDate = d.ToDate,
                Fee = d.TimeSheetEntryStudents.Sum(x=>x.Fee),
                Hour = (d.ToDate.Subtract(d.FromDate)).TotalHours
            }).ToList();

            return new PagedTeacherProductivityDto() { TotalCount = list.Count, TotalFee = list.Sum(x => x.TimeSheetEntryStudents.Sum(k=>k.Fee)), TotalHour = list.Sum(x => (x.ToDate.Subtract(x.FromDate)).TotalHours), Items = returnList };
        }

        public async Task<PagedTeacherProductivityTotalDto> GetTeacherProductivityTotalAsync(TeacherProductivityTotalResultRequestDto input)
        {
            var list = _timesheetRepository.GetAllIncluding(
                x => x.Teacher,
                x => x.TimeSheetEntryStudents)
                .WhereIf(input.FromDate.HasValue, x => x.FromDate >= input.FromDate)
                .WhereIf(input.ToDate.HasValue, x => x.ToDate <= input.ToDate).ToList();

            var returnList = list.GroupBy(x => x.TeacherId)
            .Select(d => new TeacherProductivityTotalDto
            {
                Teacher = ObjectMapper.Map<TeacherDto>(_teacherRepository.FirstOrDefault(st => st.Id == d.Key)),
                Fee = d.Sum(x => x.TimeSheetEntryStudents.Sum(k=>k.Fee)),
                Hour = d.Sum(x => x.ToDate.Subtract(x.FromDate).TotalHours)
            }).ToList();

            return new PagedTeacherProductivityTotalDto() { TotalCount = list.Count, TotalFee = list.Sum(x => x.TimeSheetEntryStudents.Sum(k => k.Fee)), TotalHour = list.Sum(x => (x.ToDate.Subtract(x.FromDate)).TotalHours), Items = returnList };
        }
    }
}