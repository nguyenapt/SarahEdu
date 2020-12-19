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
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public StudentAppService(IRepository<Student, Guid> studentRepository, IRepository<CourseSubject, Guid> courseSubjectRepository, IRepository<StudentCourseSubject, Guid> studentCourseSubjectRepository, IUnitOfWorkManager unitOfWorkManager) : base(studentRepository)
        {
            _studentRepository = studentRepository;
            _courseSubjectRepository = courseSubjectRepository;
            _studentCourseSubjectRepository = studentCourseSubjectRepository;
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

        public async Task<ListResultDto<CourseSubjectDto>> GetCourseSubjects()
        {
            var courseSubjects = _courseSubjectRepository.GetAllIncluding(x => x.Course, x => x.Subject).Select(x =>
                  new CourseSubjectDto
                  {
                      CourseId = x.CourseId,
                      SubjectId = x.SubjectId,
                      CourseName = x.Course.Name,
                      SubjectName = x.Subject.Name,
                      Id = x.Id
                  }
                );
            return new ListResultDto<CourseSubjectDto>(ObjectMapper.Map<List<CourseSubjectDto>>(courseSubjects));
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
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.FirstName.Contains(input.Keyword)
                       || x.MiddleName.Contains(input.Keyword)
                       || x.LastName.Contains(input.Keyword)
                       || x.Email.Contains(input.Keyword)
                       || x.SchoolName.Contains(input.Keyword)
                       || x.ClassName.Contains(input.Keyword)
                       || x.Description.Contains(input.Keyword));
        }
    }
}