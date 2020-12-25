using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("TeacherSalary")]
    public class TeacherSalary:Entity<Guid>
    {        
        public double Salary { get; set; } 
        public Guid TeacherId { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public bool? IsActive { get; set; }

        [ForeignKey(nameof(TeacherId))]
        public virtual Teacher Teacher { get; set; }
    }
}
