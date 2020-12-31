﻿using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Teachers.Dto
{
    [AutoMapFrom(typeof(Teacher))]
    [AutoMapTo(typeof(Teacher))]
    public class TeacherDto : EntityDto<Guid>
    {
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public double Salary { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }        
        public bool IsActive { get; set; }
        public string Color { get; set; }
    }
}
