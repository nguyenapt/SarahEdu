using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.Students.Dto;
using Abp.Application.Services.Dto;
using Sarah.Education.Subjects.Dto;
using Abp.Extensions;
using Abp.Linq.Extensions;

namespace Sarah.Education.Students
{
    public class StudentAppService : AsyncCrudAppService<Student, StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>, IStudentAppService
    {
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<CourseSubject, Guid> _courseSubjectRepository;
        private readonly IRepository<StudentCourseSubject, Guid> _studentCourseSubjectRepository;
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetRepository;
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetStudentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public StudentAppService(IRepository<Student, Guid> studentRepository, IRepository<CourseSubject, Guid> courseSubjectRepository, IRepository<StudentCourseSubject, Guid> studentCourseSubjectRepository, IRepository<TimeSheetEntry, Guid> timeSheetRepository, IRepository<TimeSheetEntryStudent, Guid> timeSheetStudentRepository, IUnitOfWorkManager unitOfWorkManager) : base(studentRepository)
        {
            _studentRepository = studentRepository;
            _courseSubjectRepository = courseSubjectRepository;
            _studentCourseSubjectRepository = studentCourseSubjectRepository;
            _timeSheetRepository = timeSheetRepository;
            _timeSheetStudentRepository = timeSheetStudentRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<StudentDto> CreateAsync(CreateStudentDto input)
        {
            CheckCreatePermission();

            Student student = ObjectMapper.Map<Student>(input);

            var studentId = Repository.InsertAndGetId(student);

            if (input.CourseSubjects != null)
            {
                CreateStudentCourseSubject(studentId, input.CourseSubjects);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(student);
        }

        public async override Task<StudentDto> UpdateAsync(StudentDto input)
        {
            CheckUpdatePermission();

            var student = _studentRepository.FirstOrDefault(x => x.Id == input.Id);

            MapToEntity(input, student);

            await _studentRepository.UpdateAsync(student);

            if (input.CourseSubjects != null)
            {
                CreateStudentCourseSubject(student.Id, input.CourseSubjects);
            }

            CurrentUnitOfWork.SaveChanges();

            return await GetAsync(input);
        }

        public async void CreateStudentCourseSubject(Guid studentId, Guid[] courseSubjectIds)
        {
            _studentCourseSubjectRepository.Delete(x => x.StudentId == studentId);

            foreach (var courseSubjectId in courseSubjectIds)
            {
                var courseSubject = _courseSubjectRepository.FirstOrDefault(x => x.Id == courseSubjectId);
                if (courseSubject != null)
                {
                    var studentCourseSubject = new StudentCourseSubject();
                    studentCourseSubject.Id = Guid.NewGuid();
                    studentCourseSubject.StudentId = studentId;
                    studentCourseSubject.CourseSubjectId = courseSubjectId;
                    await _studentCourseSubjectRepository.InsertAsync(studentCourseSubject);
                }
            }
        }

        protected override StudentDto MapToEntityDto(Student entity)
        {
            var courseSubjectIds = _studentCourseSubjectRepository.GetAll().Where(x => x.StudentId == entity.Id).Select(x => x.CourseSubjectId).ToArray();
            var studentDto = base.MapToEntityDto(entity);
            studentDto.CourseSubjects = courseSubjectIds;

            return studentDto;
        }

        protected override IQueryable<Student> CreateFilteredQuery(StudentResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.FullName.Contains(input.Keyword)
                       || x.Email.Contains(input.Keyword)
                       || x.SchoolName.Contains(input.Keyword)
                       || x.ClassName.Contains(input.Keyword)
                       || x.Description.Contains(input.Keyword));
        }

        public async Task<ListResultDto<StudentDto>> GetStudents()
        {
            var students = Repository.GetAllList();
            return new ListResultDto<StudentDto>(ObjectMapper.Map<List<StudentDto>>(students));
        }

        public async Task<PagedStudentFeeDto> GetStudentFees(StudentFeeResultRequestDto input)
        {
            var list = _timeSheetStudentRepository.GetAllIncluding(
                x => x.TimeSheetEntry,
                x => x.TimeSheetEntry.Teacher,
                x => x.TimeSheetEntry.Room,
                x => x.TimeSheetEntry.CourseSubject.Course,
                x => x.TimeSheetEntry.CourseSubject.Subject)
                .Where(x => x.StudentId == input.StudentId)
                .WhereIf(input.FromDate.HasValue, x => x.TimeSheetEntry.FromDate >= input.FromDate)
                .WhereIf(input.FromDate.HasValue, x => x.TimeSheetEntry.FromDate >= input.FromDate).ToList();

            var returnList = list
            .Skip(input.SkipCount)
            .Take(input.MaxResultCount)
            .Select(d => new StudentFeeDto
            {
                SubjectName = d.TimeSheetEntry.CourseSubject.Subject.Name,
                CourseName = d.TimeSheetEntry.CourseSubject.Course.Name,
                RoomName = d.TimeSheetEntry.Room.Name,
                TeacherName = d.TimeSheetEntry.Teacher.FullName,
                StartDate = d.TimeSheetEntry.FromDate,
                EndDate = d.TimeSheetEntry.ToDate,
                Fee = d.Fee,
                IsPaid = d.isPaid,
                IsSingle = d.TimeSheetEntry.IsSingle
            }).ToList();

            return new PagedStudentFeeDto() { TotalCount = list.Count, TotalFee = list.Sum(x=>x.Fee), TotalUnpaid = list.Where(x=>x.isPaid !=true).Sum(x=>x.Fee), Items = returnList };
        }
    }
}