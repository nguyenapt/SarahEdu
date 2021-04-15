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
using Sarah.Education.Rooms;
using Sarah.Education.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Abp.Extensions;
using Abp.Collections.Extensions;
using Abp.Domain.Uow;
using Sarah.Education.CustomTenants.Dto;

namespace Sarah.Education.Rooms
{
    public class RoomAppService : AsyncCrudAppService<Room, RoomDto, Guid, RoomResultRequestDto, CreateRoomDto, RoomDto>, IRoomAppService
    {
        private readonly IRepository<Room, Guid> _roomRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly IRepository<CustomTenant, Guid> _customTenantRepository;
        public RoomAppService(IRepository<Room, Guid> roomRepository, IRepository<CustomTenant, Guid> customTenantRepository, IUnitOfWorkManager unitOfWorkManager) : base(roomRepository)
        {
            _roomRepository = roomRepository;
            _customTenantRepository = customTenantRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<RoomDto> CreateAsync(CreateRoomDto input)
        {
            CheckCreatePermission();

            var room = ObjectMapper.Map<Room>(input);


            await _roomRepository.InsertAsync(room);

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(room);
        }


        [UnitOfWork]
        public virtual List<Room> GetRooms(int tenantId)
        {
            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                return _roomRepository.GetAllList();
            }
        }

        protected override IQueryable<Room> ApplySorting(IQueryable<Room> query, RoomResultRequestDto input)
        {
            return query.OrderBy(r => r.Name);
        }

        protected override IQueryable<Room> CreateFilteredQuery(RoomResultRequestDto input)
        {
            return Repository.GetAllIncluding(x=>x.CustomTenant)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Description.Contains(input.Keyword));
        }

        public async Task<List<RoomDto>> GetRoomByTenant(Guid customTenantId)
        {
            var rooms = _roomRepository.GetAllList(x=>x.CustomTenantId == customTenantId);
            return new List<RoomDto>(ObjectMapper.Map<List<RoomDto>>(rooms));
        }

        protected override RoomDto MapToEntityDto(Room entity)
        {
            var roomDto = base.MapToEntityDto(entity);
            roomDto.CustomTenant =
                ObjectMapper.Map<CustomTenantDto>(_customTenantRepository.Get(entity.CustomTenantId));
            return roomDto;
        }
    }
}

