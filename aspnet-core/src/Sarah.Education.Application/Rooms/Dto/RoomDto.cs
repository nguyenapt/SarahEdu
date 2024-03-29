﻿using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Rooms.Dto
{
    [AutoMapFrom(typeof(Room))]
    [AutoMapTo(typeof(Room))]
    public class RoomDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
