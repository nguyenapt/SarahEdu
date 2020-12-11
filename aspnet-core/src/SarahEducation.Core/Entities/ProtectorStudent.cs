using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("ProtectorStudent")]
    public class ProtectorStudent:Entity<Guid>
    {
        public Guid StudentId { get; set; }

        public Guid ProtectorId { get; set; }

        [ForeignKey(nameof(StudentId))]
        public virtual Student Student { get; set; }

        [ForeignKey(nameof(ProtectorId))]
        public virtual Protector Protector { get; set; }
    }
}
