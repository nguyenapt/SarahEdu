using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sarah.Education.Entities
{
    [Table("StudentPayment")]
    public class StudentPayment : Entity<Guid>
    {
        public Guid StudentId { get; set; }

        [ForeignKey(nameof(StudentId))]
        public virtual Student Student { get; set; }
        public double PaymentAmount { get; set; }
        public DateTime DateOfPayment { get; set; }
        public DateTime PaidForMonth { get; set; }

    }
}
