using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Subjects.Dto;

namespace Sarah.Education.Subjects
{
    public interface ISubjectAppService : IAsyncCrudAppService<SubjectDto, Guid, SubjectResultRequestDto, CreateSubjectDto, SubjectDto>
    {

    }
}


