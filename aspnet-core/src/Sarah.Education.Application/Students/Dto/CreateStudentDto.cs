using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Students.Dto
{
    [AutoMapTo(typeof(Student))]
    public class CreateStudentDto
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string SchoolName { get; set; }
        public string ClassName { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
        public Guid[] CourseSubjects { get; set; }
    }
}
