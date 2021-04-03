using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Teachers.Dto
{
    public class TeacherProductivityTotalDto
    {
        public TeacherDto Teacher { get; set; }
        public double Fee { get; set; }        
        public double Hour { get; set; }        
    }
}
