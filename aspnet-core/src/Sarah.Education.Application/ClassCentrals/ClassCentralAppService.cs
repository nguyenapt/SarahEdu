using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.Rooms;
using Sarah.Education.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.ClassCentrals.Dto;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Sarah.Education.Students.Dto;

namespace Sarah.Education.ClassCentrals
{
    public class ClassCentralAppService : AsyncCrudAppService<ClassCentral, ClassCentralDto, Guid, ClassCentralResultRequestDto, CreateClassCentralDto, ClassCentralDto>, IClassCentralAppService
    {
        private readonly IRepository<ClassCentral, Guid> _classCentralRepository;
        private readonly IRepository<ClassStudent, Guid> _classStudentRepository;

        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public ClassCentralAppService(IRepository<ClassCentral, Guid> classCentralRepository, IRepository<ClassStudent, Guid> classStudentRepository, IUnitOfWorkManager unitOfWorkManager) : base(classCentralRepository)
        {
            _classCentralRepository = classCentralRepository;
            _classStudentRepository = classStudentRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<ClassCentralDto> CreateAsync(CreateClassCentralDto input)
        {
            CheckCreatePermission();

            var classCentral = ObjectMapper.Map<ClassCentral>(input);

            var classCentralId = await _classCentralRepository.InsertAndGetIdAsync(classCentral);

            if (input.Students != null)
            {
                CreateOrUpdateClassStudentSubject(classCentralId, input.Students);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(classCentral);
        }

        public async override Task<ClassCentralDto> UpdateAsync(ClassCentralDto input)
        {
            CheckUpdatePermission();

            var classCentral = _classCentralRepository.FirstOrDefault(x => x.Id == input.Id);

            MapToEntity(input, classCentral);

            await _classCentralRepository.UpdateAsync(classCentral);

            if (input.Students != null)
            {
                CreateOrUpdateClassStudentSubject(classCentral.Id, input.Students);
            }

            CurrentUnitOfWork.SaveChanges();

            return await GetAsync(input);
        }

        protected override IQueryable<ClassCentral> ApplySorting(IQueryable<ClassCentral> query, ClassCentralResultRequestDto input)
        {
            return query.OrderBy(r => r.Name);
        }

        protected override IQueryable<ClassCentral> CreateFilteredQuery(ClassCentralResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Description.Contains(input.Keyword));
        }

        protected override ClassCentralDto MapToEntityDto(ClassCentral entity)
        {
            var students = _classStudentRepository.GetAllIncluding(x => x.Student).Where(x => x.ClassCentralId == entity.Id).Select(x => x.Student).ToArray();

            var classCentralDto = base.MapToEntityDto(entity);
            classCentralDto.Students = ObjectMapper.Map<StudentDto[]>(students);

            return classCentralDto;
        }

        public async void CreateOrUpdateClassStudentSubject(Guid classId, StudentDto[] students)
        {
            _classStudentRepository.Delete(x => x.ClassCentralId == classId);

            foreach (var student in students)
            {
                var obj = new ClassStudent
                {
                    Id = Guid.NewGuid(),
                    ClassCentralId = classId,
                    StudentId = student.Id
                };
                await _classStudentRepository.InsertAsync(obj);
            }
        }
    }
}

