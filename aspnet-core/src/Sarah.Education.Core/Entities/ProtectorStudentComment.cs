using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("ProtectorStudentComment")]
    public class ProtectorStudentComment : Entity<Guid>
    {
        public Guid? ProtectorId { get; set; }
        public Guid StudentId { get; set; }

        public DateTime? CommentDate { get; set; }

        public string Comment { get; set; }

        [ForeignKey(nameof(ProtectorId))]
        public virtual Protector Protector { get; set; }
        [ForeignKey(nameof(StudentId))]
        public virtual Student Student { get; set; }
    }
}
