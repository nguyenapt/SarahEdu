using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("CourseFee")]
    public class CourseFee:Entity<Guid>
    {        

        public double Fee { get; set; } 

        public Guid CourseId { get; set; }

        public int? Year { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsSingle { get; set; }

        [ForeignKey(nameof(CourseId))]
        public virtual Course Course { get; set; }
    }
}
