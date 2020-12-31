using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.Subjects;
using Sarah.Education.Subjects.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.Application.Services.Dto;

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

        protected override IQueryable<Subject> ApplySorting(IQueryable<Subject> query, SubjectResultRequestDto input)
        {
            return query.OrderBy(r => r.Name);
        }

        protected override IQueryable<Subject> CreateFilteredQuery(SubjectResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Description.Contains(input.Keyword));
        }

        public async Task<ListResultDto<SubjectDto>> GetSubjects()
        {
            var subjects = await _subjectRepository.GetAllListAsync();
            return new ListResultDto<SubjectDto>(ObjectMapper.Map<List<SubjectDto>>(subjects));
        }
    }
}

