using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Sarah.Education.Entities;
using Sarah.Education.CustomTenants;
using Sarah.Education.CustomTenants.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Abp.Extensions;
using Abp.Collections.Extensions;
using Abp.Domain.Uow;

namespace Sarah.Education.CustomTenants
{
    public class CustomTenantAppService : AsyncCrudAppService<CustomTenant, CustomTenantDto, Guid, CustomTenantResultRequestDto, CreateCustomTenantDto, CustomTenantDto>, ICustomTenantAppService
    {
        private readonly IRepository<CustomTenant, Guid> _customTenantRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public CustomTenantAppService(IRepository<CustomTenant, Guid> customTenantRepository, IUnitOfWorkManager unitOfWorkManager) : base(customTenantRepository)
        {
            _customTenantRepository = customTenantRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<CustomTenantDto> CreateAsync(CreateCustomTenantDto input)
        {
            CheckCreatePermission();

            var customTenant = ObjectMapper.Map<CustomTenant>(input);

            await _customTenantRepository.InsertAsync(customTenant);

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(customTenant);
        }


        [UnitOfWork]
        public virtual List<CustomTenant> GetCustomTenants()
        {
            return _customTenantRepository.GetAllList().OrderBy(x=>x.SortOrder).ToList();
        }

        protected override IQueryable<CustomTenant> CreateFilteredQuery(CustomTenantResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Description.Contains(input.Keyword)).OrderBy(x=>x.SortOrder);
        }
    }
}

