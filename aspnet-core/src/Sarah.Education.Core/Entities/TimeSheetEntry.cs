using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("TimeSheetEntry")]
    public class TimeSheetEntry : Entity<Guid>
    {
        public TimeSheetEntry()
        {
            TimeSheetEntryStudents = new HashSet<TimeSheetEntryStudent>();
        }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public Guid RoomId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid CourseSubjectId { get; set; }
        public double Fee { get; set; }
        public int Status { get; set; }

        [ForeignKey(nameof(RoomId))]
        public virtual Room Room { get; set; }

        [ForeignKey(nameof(TeacherId))]
        public virtual Teacher Teacher { get; set; }

        [ForeignKey(nameof(CourseSubjectId))]
        public virtual CourseSubject CourseSubject { get; set; }

        public virtual ICollection<TimeSheetEntryStudent> TimeSheetEntryStudents { get; set; }

    }
}
