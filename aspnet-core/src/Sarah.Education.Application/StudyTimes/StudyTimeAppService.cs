using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Sarah.Education.Entities;
using Sarah.Education.Rooms;
using Sarah.Education.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Abp.Extensions;
using Abp.Collections.Extensions;
using Abp.Domain.Uow;
using Sarah.Education.StudyTimes.Dto;
using Abp.Application.Services.Dto;

namespace Sarah.Education.StudyTimes
{
    public class StudyTimeAppService : AsyncCrudAppService<StudyTime, StudyTimeDto, Guid, StudyTimeResultRequestDto, CreateStudyTimeDto, StudyTimeDto>, IStudyTimeAppService
    {
        private readonly IRepository<StudyTime, Guid> _studytimeRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public StudyTimeAppService(IRepository<StudyTime, Guid> studytimeRepository, IUnitOfWorkManager unitOfWorkManager) : base(studytimeRepository)
        {
            _studytimeRepository = studytimeRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task<ListResultDto<StudyTimeDto>> GetStudyTimes()
        {
            var studyTimes = await _studytimeRepository.GetAllListAsync();
            return new ListResultDto<StudyTimeDto>(ObjectMapper.Map<List<StudyTimeDto>>(studyTimes.OrderBy(x => x.SortOrder)));
        }
    }
}

