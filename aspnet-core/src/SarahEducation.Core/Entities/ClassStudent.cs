using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("ClassStudent")]
    public class ClassStudent : Entity<Guid>
    {
        public Guid StudentId { get; set; }
        public Guid ClassCentralId { get; set; }

        [ForeignKey(nameof(StudentId))]
        public virtual Student Student { get; set; }

        [ForeignKey(nameof(ClassCentralId))]
        public virtual ClassCentral ClassCentral { get; set; }
    }
}
