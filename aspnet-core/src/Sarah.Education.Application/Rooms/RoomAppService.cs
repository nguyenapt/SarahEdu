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

namespace Sarah.Education.Rooms
{
    public class RoomAppService : AsyncCrudAppService<Room, RoomDto, Guid, RoomResultRequestDto, CreateRoomDto, RoomDto>, IRoomAppService
    {
        private readonly IRepository<Room, Guid> _roomRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public RoomAppService(IRepository<Room, Guid> roomRepository, IUnitOfWorkManager unitOfWorkManager) : base(roomRepository)
        {
            _roomRepository = roomRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<RoomDto> CreateAsync(CreateRoomDto input)
        {
            CheckCreatePermission();

            var room = ObjectMapper.Map<Room>(input);

            room.TenantId = AbpSession.TenantId ?? 1;

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
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Description.Contains(input.Keyword));
        }

        public async Task<List<RoomDto>> GetRoomByCurrentTenant()
        {
            var tenantId = AbpSession.TenantId ?? 1;
            var rooms = await _roomRepository.GetAllListAsync(x => x.TenantId == tenantId);
            return new List<RoomDto>(ObjectMapper.Map<List<RoomDto>>(rooms));
        }
    }
}

