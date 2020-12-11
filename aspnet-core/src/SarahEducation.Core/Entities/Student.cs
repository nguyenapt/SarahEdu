using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("Student")]
    public class Student : Entity<Guid>
    {
        public Student()
        {
            ProtectorStudents = new HashSet<ProtectorStudent>();
            StudentCourseSubjects = new HashSet<StudentCourseSubject>();
        }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string MiddleName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        public DateTime? DateOfBirth {get;set;}

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string SchoolName { get; set; }

        public string ClassName { get; set; }

        public bool IsActive { get; set; }

        public string Description { get; set; }

        public virtual ICollection<ProtectorStudent> ProtectorStudents { get; set; }

        public virtual ICollection<StudentCourseSubject> StudentCourseSubjects { get; set; }
    }
}
