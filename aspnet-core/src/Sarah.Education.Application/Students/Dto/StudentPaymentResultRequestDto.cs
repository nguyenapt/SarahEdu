using System;

namespace Sarah.Education.Students.Dto
{
    public class StudentPaymentResultRequestDto
    {
        public Guid StudentId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }        
    }
}
