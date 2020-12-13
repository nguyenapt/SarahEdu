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
using Sarah.Education.Students.Dto;

namespace Sarah.Education.Students
{
    public class StudentAppService : AsyncCrudAppService<Student, StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>, IStudentAppService
    {
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public StudentAppService(IRepository<Student, Guid> studentRepository, IUnitOfWorkManager unitOfWorkManager) : base(studentRepository)
        {
            _studentRepository = studentRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }
    }
}