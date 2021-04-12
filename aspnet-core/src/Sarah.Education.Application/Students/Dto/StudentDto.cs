using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.Protectors.Dto;

namespace Sarah.Education.Students.Dto
{
    [AutoMapFrom(typeof(Student))]
    [AutoMapTo(typeof(Student))]
    public class StudentDto : EntityDto<Guid>
    {
        public string FullName { get; set; }
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
        public ProtectorDto Protector { get; set; }
    }
}
