using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using SarahEducation.Entities;
using SarahEducation.Rooms;
using SarahEducation.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using SarahEducation.Courses.Dto;

namespace SarahEducation.Courses
{
    public class CourseAppService : AsyncCrudAppService<Course, CourseDto, Guid, CourseResultRequestDto, CreateCourseDto, CourseDto>, ICourseAppService
    {
        private readonly IRepository<Course, Guid> _courseRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public CourseAppService(IRepository<Course, Guid> courseRepository, IUnitOfWorkManager unitOfWorkManager) : base(courseRepository)
        {
            _courseRepository = courseRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }       
    }
}

