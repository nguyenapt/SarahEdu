using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.Rooms;
using Sarah.Education.Rooms.Dto;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace ET.Resources
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
    }
}

