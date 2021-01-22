using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.TimeSheetEntries.Dto
{
    public class StudyTimeInWeekDto
    {
        public Guid Id { get; set; }
        public DateTime WeekDay { get; set; }
        public string FromHour { get; set; }
        public string ToHour { get; set; }
        public int SortOrder { get; set; }
        public List<TimeSheetEntryDto> TimeSheetEntries { get; set; }
    }
}
