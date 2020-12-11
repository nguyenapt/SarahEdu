using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("Course")]
    public class Course:Entity<Guid>
    {
        public Course()
        {
            CourseFees = new HashSet<CourseFee>();
            CourseSubjects = new HashSet<CourseSubject>();
        }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<CourseFee> CourseFees { get; set; }

        public virtual ICollection<CourseSubject> CourseSubjects { get; set; }
    }
}
