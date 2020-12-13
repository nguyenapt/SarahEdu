using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.Rooms.Dto;

namespace Sarah.Education.Rooms
{
    public interface IRoomAppService : IAsyncCrudAppService<RoomDto, Guid, RoomResultRequestDto, CreateRoomDto, RoomDto>
    {

    }
}


