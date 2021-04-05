using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.Rooms;
using Sarah.Education.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.Courses.Dto;
using Abp.Application.Services.Dto;
using Sarah.Education.Subjects.Dto;
using Sarah.Education.CourseFees.Dto;

namespace Sarah.Education.Courses
{
    public class CourseAppService : AsyncCrudAppService<Course, CourseDto, Guid, CourseResultRequestDto, CreateCourseDto, CourseDto>, ICourseAppService
    {
        private readonly IRepository<Course, Guid> _courseRepository;
        private readonly IRepository<Subject, Guid> _subjectRepository;
        private readonly IRepository<CourseSubject, Guid> _courseSubjectRepository;
        private readonly IRepository<CourseFee, Guid> _courseFeeRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public CourseAppService(IRepository<Course, Guid> courseRepository, IRepository<Subject, Guid> subjectRepository, IRepository<CourseSubject, Guid> courseSubjectRepository, IRepository<CourseFee, Guid> courseFeeRepository, IUnitOfWorkManager unitOfWorkManager) : base(courseRepository)
        {
            _courseRepository = courseRepository;
            _subjectRepository = subjectRepository;
            _courseSubjectRepository = courseSubjectRepository;
            _courseFeeRepository = courseFeeRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public override async Task<CourseDto> CreateAsync(CreateCourseDto input)
        {
            CheckCreatePermission();

            var course = ObjectMapper.Map<Course>(input);

            var courseId = await _courseRepository.InsertAndGetIdAsync(course);

            if (input.Subjects != null)
            {
                CreateCourseSubject(courseId, input.Subjects);
            }

            if (input.CourseFees != null)
            {
                CreateCourseFee(courseId, input.CourseFees);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(course);
        }

        public async override Task<CourseDto> UpdateAsync(CourseDto input)
        {
            CheckUpdatePermission();

            var course = _courseRepository.FirstOrDefault(x => x.Id == input.Id);

            MapToEntity(input, course);

            await _courseRepository.UpdateAsync(course);

            if (input.Subjects != null)
            {
                CreateCourseSubject(course.Id, input.Subjects);
            }

            if (input.CourseFees != null)
            {
                CreateCourseFee(course.Id, input.CourseFees);
            }

            CurrentUnitOfWork.SaveChanges();

            return await GetAsync(input);
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

        public async Task<List<CourseWithSubjectDto>> GetCourseWithSubject()
        {
            var courses = _courseRepository.GetAllIncluding(x => x.CourseSubjects);

            return courses.Select(x => new CourseWithSubjectDto()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                CourseSubjects = x.CourseSubjects.Select(k => new CourseSubjectDto()
                {
                    Id = k.Id,
                    CourseId = k.CourseId,
                    SubjectId = k.SubjectId,
                    CourseName = k.Course.Name,
                    SubjectName = k.Subject.Name
                }).ToArray(),
                CourseFees = x.CourseFees.Where(y => y.IsActive != false).Select(k => new CourseFeeDto()
                {
                    Id = k.Id,
                    Fee = k.Fee,
                    FeeMultiple = k.FeeMultiple,
                    Year = k.Year.Value,
                    IsActive = k.IsActive,
                    ActiveFrom = k.ActiveFrom
                }).ToArray()
            }).ToList();
        }

        public async void CreateCourseSubject(Guid courseId, string[] subjectNames)
        {
            _courseSubjectRepository.Delete(x => x.CourseId == courseId);

            foreach (var subjectName in subjectNames)
            {
                var subject = _subjectRepository.FirstOrDefault(x => x.Name == subjectName);
                if (subject != null)
                {
                    var courseSubject = new CourseSubject();
                    courseSubject.Id = Guid.NewGuid();
                    courseSubject.CourseId = courseId;
                    courseSubject.SubjectId = subject.Id;
                    await _courseSubjectRepository.InsertAsync(courseSubject);
                }
            }
        }

        public async void CreateCourseFee(Guid courseId, CourseFeeDto[] courseFees)
        {
            _courseFeeRepository.Delete(x => x.CourseId == courseId);

            foreach (var courseFee in courseFees)
            {
                var courseFeeObj = ObjectMapper.Map<CourseFee>(courseFee);
                courseFeeObj.CourseId = courseId;
                if (!courseFeeObj.ActiveFrom.HasValue)
                {
                    courseFeeObj.ActiveFrom = DateTime.Now;
                }
                await _courseFeeRepository.InsertAsync(courseFeeObj);
            }
        }

        protected override CourseDto MapToEntityDto(Course entity)
        {
            var subjectIds = _courseSubjectRepository.GetAll().Where(x => x.CourseId == entity.Id).Select(x => x.SubjectId).ToArray();

            var subjects = _subjectRepository.GetAll().Where(r => subjectIds.Contains(r.Id)).Select(r => r.Name);

            var courseDto = base.MapToEntityDto(entity);
            courseDto.Subjects = subjects.ToArray();
            var courseFees = _courseFeeRepository.GetAllList(x => x.CourseId == entity.Id).Select(x=> new CourseFeeDto { 
                Id = x.Id,
                ActiveFrom = x.ActiveFrom,
                CourseId = x.CourseId,
                Fee = x.Fee,
                FeeMultiple = x.FeeMultiple,
                IsActive = x.IsActive,
                Year = x.Year
            }).ToArray();
            courseDto.CourseFees = courseFees; 
            return courseDto;
        }
    }
}

