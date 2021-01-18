using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("StudyTime")]
    public class StudyTime: Entity<Guid>
    {
        public StudyTime()
        {
            TimeSheetEntries = new HashSet<TimeSheetEntry>();
        }
        public string Name { get; set; }

        [StringLength(10)]
        public string FromHour { get; set; }
        [StringLength(10)]
        public string ToHour { get; set; }
        public int SortOrder { get; set; }

        public virtual ICollection<TimeSheetEntry> TimeSheetEntries { get; set; }

    }
}
