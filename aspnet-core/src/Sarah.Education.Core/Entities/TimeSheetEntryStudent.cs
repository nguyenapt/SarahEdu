using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("TimeSheetEntryStudent")]
    public class TimeSheetEntryStudent : Entity<Guid>
    {
        public Guid StudentId { get; set; }
        public Guid TimeSheetEntryId { get; set; }
        public string Attitude { get; set; }
        public string ReceptiveAbility { get; set; }
        public string Description { get; set; }
        public double Fee { get; set; }
        public bool? isPaid { get; set; }

        [ForeignKey(nameof(StudentId))]
        public virtual Student Student { get; set; }

        [ForeignKey(nameof(TimeSheetEntryId))]
        public virtual TimeSheetEntry TimeSheetEntry { get; set; }        
    }
}
