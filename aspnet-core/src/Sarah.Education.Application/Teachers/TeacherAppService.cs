﻿using System;
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
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TeacherAppService(IRepository<Teacher, Guid> teacherRepository, IUnitOfWorkManager unitOfWorkManager) : base(teacherRepository)
        {
            _teacherRepository = teacherRepository;
            _unitOfWorkManager = unitOfWorkManager;
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
    }
}