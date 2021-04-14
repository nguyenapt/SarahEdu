using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace Sarah.Education.Entities
{
    [Table("CustomTenant")]
    public class CustomTenant : Entity<Guid>
    {
        public CustomTenant()
        {
            Rooms = new HashSet<Room>();
            Classes = new HashSet<ClassCentral>();
        }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }

        public virtual ICollection<ClassCentral> Classes { get; set; }
    }
}
