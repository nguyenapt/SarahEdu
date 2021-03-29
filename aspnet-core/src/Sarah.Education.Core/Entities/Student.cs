using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("Student")]
    public class Student : Entity<Guid>
    {
        public Student()
        {
            ProtectorStudents = new HashSet<ProtectorStudent>();
            StudentCourseSubjects = new HashSet<StudentCourseSubject>();
            StudentPayments = new HashSet<StudentPayment>();
            ProtectorStudentComments = new HashSet<ProtectorStudentComment>();
        }

        [Required]
        [StringLength(500)]
        public string FullName { get; set; }

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

        public virtual ICollection<StudentPayment> StudentPayments { get; set; }

        public virtual ICollection<ProtectorStudentComment> ProtectorStudentComments { get; set; }
    }
}
