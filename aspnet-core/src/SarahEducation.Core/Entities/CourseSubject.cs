using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("CourseSubject")]
    public class CourseSubject : Entity<Guid>
    {
        public CourseSubject()
        {
            TimeSheetEntries = new HashSet<TimeSheetEntry>();
        }
        public Guid CourseId { get; set; }
        public Guid SubjectId { get; set; }

        [ForeignKey(nameof(CourseId))]
        public virtual Course Course { get; set; }

        [ForeignKey(nameof(SubjectId))]
        public virtual Subject Subject { get; set; }

        public virtual ICollection<TimeSheetEntry> TimeSheetEntries { get; set; }

    }
}
