using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using SarahEducation.Entities;
using SarahEducation.Rooms;
using SarahEducation.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using SarahEducation.ClassCentrals.Dto;

namespace SarahEducation.ClassCentrals
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
    }
}

