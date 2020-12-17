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

namespace Sarah.Education.Courses
{
    public class CourseAppService : AsyncCrudAppService<Course, CourseDto, Guid, CourseResultRequestDto, CreateCourseDto, CourseDto>, ICourseAppService
    {
        private readonly IRepository<Course, Guid> _courseRepository;
        private readonly IRepository<Subject, Guid> _subjectRepository;
        private readonly IRepository<CourseSubject, Guid> _courseSubjectRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public CourseAppService(IRepository<Course, Guid> courseRepository, IRepository<Subject, Guid> subjectRepository, IRepository<CourseSubject, Guid> courseSubjectRepository, IUnitOfWorkManager unitOfWorkManager) : base(courseRepository)
        {
            _courseRepository = courseRepository;
            _subjectRepository = subjectRepository;
            _courseSubjectRepository = courseSubjectRepository;
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

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(course);
        }

        public async override Task<CourseDto> UpdateAsync(CourseDto input)
        {
            CheckUpdatePermission();

            var course = _courseRepository.FirstOrDefault(x=>x.Id == input.Id);

            MapToEntity(input, course);

            await _courseRepository.UpdateAsync(course);

            if (input.Subjects != null)
            {
                CreateCourseSubject(course.Id, input.Subjects);
            }

            CurrentUnitOfWork.SaveChanges();

            return await GetAsync(input);
        }

        public async Task<ListResultDto<SubjectDto>> GetSubjects()
        {
            var subjects = await _subjectRepository.GetAllListAsync();
            return new ListResultDto<SubjectDto>(ObjectMapper.Map<List<SubjectDto>>(subjects));
        }

        public async void CreateCourseSubject(Guid courseId, string[] subjectNames)
        {
            var courseSubjects = _courseSubjectRepository.GetAll().Where(x => x.CourseId == courseId);
            if(courseSubjects != null && courseSubjects.Any())
            {
                foreach(var courseSubject in courseSubjects)
                {
                    _courseSubjectRepository.Delete(courseSubject);
                }                
            }
            foreach (var subjectName in subjectNames)
            {
                var subject = _subjectRepository.FirstOrDefault(x => x.Name == subjectName);
                if(subject != null)
                {
                    var courseSubject = new CourseSubject();
                    courseSubject.Id = Guid.NewGuid();
                    courseSubject.CourseId = courseId;
                    courseSubject.SubjectId = subject.Id;
                    await _courseSubjectRepository.InsertAsync(courseSubject);
                }
            }            
        }

        protected override CourseDto MapToEntityDto(Course entity)
        {
            var subjectIds = _courseSubjectRepository.GetAll().Where(x=>x.CourseId == entity.Id).Select(x => x.SubjectId).ToArray();

            var subjects = _subjectRepository.GetAll().Where(r => subjectIds.Contains(r.Id)).Select(r => r.Name);

            var courseDto = base.MapToEntityDto(entity);
            courseDto.Subjects = subjects.ToArray();

            return courseDto;
        }
    }
}

