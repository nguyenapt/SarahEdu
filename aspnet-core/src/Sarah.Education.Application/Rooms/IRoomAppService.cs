using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Rooms.Dto;

namespace Sarah.Education.Rooms
{
    public interface IRoomAppService : IAsyncCrudAppService<RoomDto, Guid, RoomResultRequestDto, CreateRoomDto, RoomDto>
    {
        Task<List<RoomDto>> GetRoomByTenant(Guid customTenantId);
    }
}


