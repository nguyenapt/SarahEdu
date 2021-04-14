using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("Room")]
    public class Room:Entity<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid CustomTenantId { get; set; }

        [ForeignKey(nameof(CustomTenantId))]
        public virtual CustomTenant CustomTenant { get; set; }
    }
}
