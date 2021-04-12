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
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<Protector, Guid> _protectorRepository;
        private readonly IRepository<ProtectorStudent, Guid> _protectorStudentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public ProtectorAppService(IRepository<Protector,Guid> protectorRepository, IRepository<ProtectorStudent, Guid> protectorStudentRepository, IRepository<Student, Guid> studentRepository, IUnitOfWorkManager unitOfWorkManager) : base(protectorRepository)
        {
            _protectorRepository = protectorRepository;
            _protectorStudentRepository = protectorStudentRepository;
            _studentRepository = studentRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<ProtectorDto> CreateAsync(CreateProtectorDto input)
        {
            CheckCreatePermission();

            var protector = ObjectMapper.Map<Protector>(input);

            var protectorId = await _protectorRepository.InsertAndGetIdAsync(protector);

            if (input.StudentIds != null)
            {
                CreateProtectorStudentSubject(protectorId, input.StudentIds);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(protector);
        }

        public async override Task<ProtectorDto> UpdateAsync(ProtectorDto input)
        {
            CheckUpdatePermission();

            var protector = _protectorRepository.FirstOrDefault(x => x.Id == input.Id);

            MapToEntity(input, protector);

            await _protectorRepository.UpdateAsync(protector);

            if (input.Students != null)
            {
                CreateProtectorStudentSubject(protector.Id, input.Students.Select(x=>x.Id).ToArray());
            }

            CurrentUnitOfWork.SaveChanges();

            return await GetAsync(input);
        }

        public async void CreateProtectorStudentSubject(Guid protectorId, Guid[] studentIds)
        {
            _protectorStudentRepository.Delete(x => x.ProtectorId == protectorId);

            foreach (var studentId in studentIds)
            {
                var student = _studentRepository.FirstOrDefault(x => x.Id == studentId);
                if (student != null)
                {
                    var protectorStudent = new ProtectorStudent();
                    protectorStudent.Id = Guid.NewGuid();
                    protectorStudent.ProtectorId = protectorId;
                    protectorStudent.StudentId = studentId;
                    await _protectorStudentRepository.InsertAsync(protectorStudent);
                }
            }
        }

        protected override IQueryable<Protector> CreateFilteredQuery(ProtectorResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.FullName.Contains(input.Keyword)
                       || x.Email.Contains(input.Keyword));
        }

        protected override ProtectorDto MapToEntityDto(Protector entity)
        {
            var students = _protectorStudentRepository.GetAllIncluding(x=>x.Student).Where(x=>x.ProtectorId == entity.Id).Select(x => x.Student).ToArray();

            var protector = base.MapToEntityDto(entity);
            protector.Students = ObjectMapper.Map<StudentDto[]>(students);

            return protector;
        }

        public async Task<List<ProtectorDto>> GetProtectorAsync(Guid Id)
        {
            var protectors = _protectorStudentRepository.GetAllIncluding(x => x.Student).Where(x => x.StudentId == Id).Select(x => x.Protector).ToList();

            return ObjectMapper.Map<List<ProtectorDto>>(protectors);
        }
    }
}