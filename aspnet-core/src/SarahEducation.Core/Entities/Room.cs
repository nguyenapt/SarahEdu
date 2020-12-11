using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SarahEducation.Entities
{
    [Table("Room")]
    public class Room:Entity<Guid>,IMustHaveTenant
    {
        public string Name { get; set; }
        public int TenantId { get; set; }
        public string Description { get; set; }
    }
}
