using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("Subject")]
    public class Subject:Entity<Guid>
    {
        public Subject()
        {
            CourseSubjects = new HashSet<CourseSubject>();
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<CourseSubject> CourseSubjects { get; set; }
    }
}
