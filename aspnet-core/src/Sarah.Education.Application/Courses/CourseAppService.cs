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

namespace Sarah.Education.Courses
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

