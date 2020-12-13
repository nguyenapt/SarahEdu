using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using SarahEducation.Entities;
using SarahEducation.Subjects;
using SarahEducation.Subjects.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace SarahEducation.Subjects
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

