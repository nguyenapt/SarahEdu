using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("Protector")]
    public class Protector:Entity<Guid>
    {
        public Protector()
        {
            ProtectorStudents = new HashSet<ProtectorStudent>();
        }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string MiddleName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public int ProtectorType { get; set; }

        public virtual ICollection<ProtectorStudent> ProtectorStudents { get; set; }
        public bool IsActive { get; set; }
    }
}
