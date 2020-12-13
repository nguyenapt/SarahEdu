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
using Sarah.Education.Teachers.Dto;

namespace Sarah.Education.Teachers
{
    public class TeacherAppService : AsyncCrudAppService<Teacher, TeacherDto, Guid, TeacherResultRequestDto, CreateTeacherDto, TeacherDto>, ITeacherAppService
    {
        private readonly IRepository<Teacher, Guid> _teacherRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TeacherAppService(IRepository<Teacher, Guid> teacherRepository, IUnitOfWorkManager unitOfWorkManager) : base(teacherRepository)
        {
            _teacherRepository = teacherRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }
    }
}