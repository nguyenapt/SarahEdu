using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Subjects.Dto;

namespace SarahEducation.Subjects
{
    public interface ISubjectAppService : IAsyncCrudAppService<SubjectDto, Guid, SubjectResultRequestDto, CreateSubjectDto, SubjectDto>
    {

    }
}


