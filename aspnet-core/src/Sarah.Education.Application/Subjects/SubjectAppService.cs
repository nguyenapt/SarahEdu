using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.Subjects;
using Sarah.Education.Subjects.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace Sarah.Education.Subjects
{
    public class SubjectAppService : AsyncCrudAppService<Subject, SubjectDto, Guid, SubjectResultRequestDto, CreateSubjectDto, SubjectDto>, ISubjectAppService
    {
        private readonly IRepository<Subject, Guid> _subjectRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public SubjectAppService(IRepository<Subject, Guid> subjectRepository, IUnitOfWorkManager unitOfWorkManager) : base(subjectRepository)
        {
            _subjectRepository = subjectRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

    }
}

