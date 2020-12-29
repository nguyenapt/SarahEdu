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
        public Guid ProtectorStudentId { get; set; }        

        public DateTime? CommentDate { get; set; }

        public string Comment { get; set; }

        [ForeignKey(nameof(ProtectorStudentId))]
        public virtual ProtectorStudent ProtectorStudent { get; set; }
    }
}
