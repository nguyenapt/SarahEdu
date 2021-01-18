using System;

namespace Sarah.Education.TimeSheetEntries.Dto
{
    public class TimeSheetEntryResultRequestDto
    {
        public Guid? RoomId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

    }
}
