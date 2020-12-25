using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("Protector")]
    public class Protector:Entity<Guid>
    {
        public Protector()
        {
            ProtectorStudents = new HashSet<ProtectorStudent>();
        }

        [Required]
        [StringLength(500)]
        public string FullName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public int ProtectorType { get; set; }

        public virtual ICollection<ProtectorStudent> ProtectorStudents { get; set; }
        public bool IsActive { get; set; }
    }
}
