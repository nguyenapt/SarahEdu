﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.CourseFees.Dto;

namespace Sarah.Education.CourseFees
{
    public class CourseFeeAppService : AsyncCrudAppService<CourseFee, CourseFeeDto, Guid, CourseFeeResultRequestDto, CreateCourseFeeDto, CourseFeeDto>, ICourseFeeAppService
    {
        private readonly IRepository<CourseFee, Guid> _courseFeeRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public CourseFeeAppService(IRepository<CourseFee, Guid> courseFeeRepository, IUnitOfWorkManager unitOfWorkManager) : base(courseFeeRepository)
        {
            _courseFeeRepository = courseFeeRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }       
    }
}

