using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Students.Dto
{
    public class StudentFeeDto
    {
        public double Fee { get; set; }
        public bool? IsSingle { get; set; }
        public  DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public  string RoomName { get; set; }
        public  string CourseName { get; set; }
        public string SubjectName { get; set; }
        public string TeacherName { get; set; }
        public bool? IsPaid { get; set; }
    }
}
