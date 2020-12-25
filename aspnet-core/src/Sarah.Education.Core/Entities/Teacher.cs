using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("Teacher")]
    public class Teacher:Entity<Guid>
    {
        public Teacher()
        {
            TimeSheetEntries = new HashSet<TimeSheetEntry>();
            TeacherSalaries = new HashSet<TeacherSalary>();
        }

        [Required]
        [StringLength(500)]
        public string FullName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public double Salary { get; set; }

        public string Description { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<TimeSheetEntry> TimeSheetEntries { get; set; }

        public virtual ICollection<TeacherSalary> TeacherSalaries { get; set; }
    }
}
