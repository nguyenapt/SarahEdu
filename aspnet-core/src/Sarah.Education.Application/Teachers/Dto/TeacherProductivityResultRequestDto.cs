using System;

namespace Sarah.Education.Teachers.Dto
{
    public class TeacherProductivityResultRequestDto
    {
        public Guid TeacherId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int SkipCount { get; set; }
        public int MaxResultCount { get; set; }
    }
}
