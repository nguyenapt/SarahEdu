using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Rooms.Dto;
using Sarah.Education.StudyTimes.Dto;

namespace Sarah.Education.StudyTimes
{
    public interface IStudyTimeAppService : IAsyncCrudAppService<StudyTimeDto, Guid, StudyTimeResultRequestDto, CreateStudyTimeDto, StudyTimeDto>
    {
        Task<List<StudyTimeDto>> GetStudyTimes();
    }
}


