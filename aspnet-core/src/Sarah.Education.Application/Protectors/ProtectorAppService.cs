using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.Protectors;
using Sarah.Education.Protectors.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Abp.Linq.Extensions;
using Abp.Extensions;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.Protectors
{
    public class ProtectorAppService : AsyncCrudAppService<Protector, ProtectorDto, Guid, ProtectorResultRequestDto, CreateProtectorDto, ProtectorDto>, IProtectorAppService
    {
        private readonly IRepository<Protector, Guid> _protectorRepository;
        private readonly IRepository<ProtectorStudent, Guid> _protectorStudentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public ProtectorAppService(IRepository<Protector,Guid> protectorRepository, IRepository<ProtectorStudent, Guid> protectorStudentRepository, IUnitOfWorkManager unitOfWorkManager) : base(protectorRepository)
        {
            _protectorRepository = protectorRepository;
            _protectorStudentRepository = protectorStudentRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        protected override IQueryable<Protector> CreateFilteredQuery(ProtectorResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.FirstName.Contains(input.Keyword)
                       || x.MiddleName.Contains(input.Keyword)
                       || x.LastName.Contains(input.Keyword)
                       || x.Email.Contains(input.Keyword));
        }

        protected override ProtectorDto MapToEntityDto(Protector entity)
        {
            var students = _protectorStudentRepository.GetAllIncluding(x=>x.Student).Where(x=>x.ProtectorId == entity.Id).Select(x => x.Student).ToArray();

            var protector = base.MapToEntityDto(entity);
            protector.Students = ObjectMapper.Map<StudentDto[]>(students);

            return protector;
        }
    }
}