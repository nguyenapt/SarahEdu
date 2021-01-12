using System;

namespace Sarah.Education.Students.Dto
{
    public class StudentFeeResultRequestDto
    {
        public Guid StudentId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int SkipCount { get; set; }
        public int MaxResultCount { get; set; }
    }
}
