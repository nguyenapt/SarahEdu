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

namespace Sarah.Education.Students
{
    public class StudentAppService : AsyncCrudAppService<Student, StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>, IStudentAppService
    {
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<CourseSubject, Guid> _courseSubjectRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public StudentAppService(IRepository<Student, Guid> studentRepository, IRepository<CourseSubject, Guid> courseSubjectRepository, IUnitOfWorkManager unitOfWorkManager) : base(studentRepository)
        {
            _studentRepository = studentRepository;
            _courseSubjectRepository = courseSubjectRepository;
            _unitOfWorkManager = unitOfWorkManager;
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
    }
}