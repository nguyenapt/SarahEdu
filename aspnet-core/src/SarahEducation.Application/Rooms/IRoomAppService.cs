using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using SarahEducation.Rooms.Dto;

namespace SarahEducation.Rooms
{
    public interface IRoomAppService : IAsyncCrudAppService<RoomDto, Guid, RoomResultRequestDto, CreateRoomDto, RoomDto>
    {

    }
}


