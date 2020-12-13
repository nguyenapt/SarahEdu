using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Teachers.Dto
{
    [AutoMapTo(typeof(Teacher))]
    public class CreateTeacherDto
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public double Salary { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
