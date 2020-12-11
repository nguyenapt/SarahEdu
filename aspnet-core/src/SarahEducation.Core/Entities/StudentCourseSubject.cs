using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("StudentCourseSubject")]
    public class StudentCourseSubject : Entity<Guid>
    {
        public Guid StudentId { get; set; }
        public Guid CourseSubjectId { get; set; }

        [ForeignKey(nameof(StudentId))]
        public virtual Student Student { get; set; }

        [ForeignKey(nameof(CourseSubjectId))]
        public virtual CourseSubject CourseSubject { get; set; }
    }
}
