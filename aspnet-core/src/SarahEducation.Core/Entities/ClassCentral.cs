using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("ClassCentral")]
    public class ClassCentral : Entity<Guid>
    {
        public ClassCentral()
        {
            ClassStudents = new HashSet<ClassStudent>();
        }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<ClassStudent> ClassStudents { get; set; }

    }
}
