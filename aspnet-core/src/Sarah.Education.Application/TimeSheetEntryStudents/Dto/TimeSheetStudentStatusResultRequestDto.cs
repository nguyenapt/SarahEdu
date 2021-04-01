using System;

namespace Sarah.Education.TimeSheetEntryStudents.Dto
{
    public class TimeSheetStudentStatusResultRequestDto
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int? Attitude { get; set; }
    }
}
