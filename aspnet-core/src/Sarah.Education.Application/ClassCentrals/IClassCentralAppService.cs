﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Sarah.Education.ClassCentrals.Dto;
using Sarah.Education.Rooms.Dto;

namespace Sarah.Education.ClassCentrals
{
    public interface IClassCentralAppService : IAsyncCrudAppService<ClassCentralDto, Guid, ClassCentralResultRequestDto, CreateClassCentralDto, ClassCentralDto>
    {
        Task<List<ClassWithStudentDto>> GetClassWithStudents();
    }
}


