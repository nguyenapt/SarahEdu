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

namespace Sarah.Education.Protectors
{
    public class ProtectorAppService : AsyncCrudAppService<Protector, ProtectorDto, Guid, ProtectorResultRequestDto, CreateProtectorDto, ProtectorDto>, IProtectorAppService
    {
        private readonly IRepository<Protector, Guid> _protectorRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public ProtectorAppService(IRepository<Protector,Guid> protectorRepository, IUnitOfWorkManager unitOfWorkManager) : base(protectorRepository)
        {
            _protectorRepository = protectorRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }
    }
}