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

namespace ET.Resources
{
    public class RoomAppService : AsyncCrudAppService<Room, RoomDto, Guid, RoomResultRequestDto, CreateRoomDto, RoomDto>, IRoomAppService
    {
        private readonly IRepository<Room, Guid> _roomRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public RoomAppService(IRepository<Room,Guid> roomRepository, IUnitOfWorkManager unitOfWorkManager) : base(roomRepository)
        {
            _roomRepository = roomRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        [UnitOfWork]
        public virtual List<Room> GetProducts(int tenantId)
        {
            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                return _roomRepository.GetAllList();
            }
        }
    }
}

