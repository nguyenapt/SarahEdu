using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Teachers.Dto
{
    public class TeacherProductivityDto
    {
        public double Fee { get; set; }
        public double Paid { get; set; }
        public double Hour { get; set; }
        public  DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public  string RoomName { get; set; }
        public  string CourseName { get; set; }
        public string SubjectName { get; set; }
    }
}
