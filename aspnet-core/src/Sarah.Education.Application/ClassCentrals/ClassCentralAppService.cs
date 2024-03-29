﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.Rooms;
using Sarah.Education.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.ClassCentrals.Dto;
using Abp.Extensions;
using Abp.Linq.Extensions;

namespace Sarah.Education.ClassCentrals
{
    public class ClassCentralAppService : AsyncCrudAppService<ClassCentral, ClassCentralDto, Guid, ClassCentralResultRequestDto, CreateClassCentralDto, ClassCentralDto>, IClassCentralAppService
    {
        private readonly IRepository<ClassCentral, Guid> _classCentralRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public ClassCentralAppService(IRepository<ClassCentral, Guid> classCentralRepository, IUnitOfWorkManager unitOfWorkManager) : base(classCentralRepository)
        {
            _classCentralRepository = classCentralRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        protected override IQueryable<ClassCentral> ApplySorting(IQueryable<ClassCentral> query, ClassCentralResultRequestDto input)
        {
            return query.OrderBy(r => r.Name);
        }

        protected override IQueryable<ClassCentral> CreateFilteredQuery(ClassCentralResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Description.Contains(input.Keyword));
        }
    }
}

