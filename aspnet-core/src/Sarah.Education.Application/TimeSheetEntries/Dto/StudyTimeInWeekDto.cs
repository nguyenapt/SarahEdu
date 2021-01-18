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
        public string Name { get; set; }
        public string FromHour { get; set; }
        public string ToHour { get; set; }
        public int? SortOrder { get; set; }
        public List<TimeSheetEntryDto> Mon { get; set; }
        public List<TimeSheetEntryDto> Tue { get; set; }
        public List<TimeSheetEntryDto> Wed { get; set; }
        public List<TimeSheetEntryDto> Thu { get; set; }
        public List<TimeSheetEntryDto> Fri { get; set; }
        public List<TimeSheetEntryDto> Sat { get; set; }
        public List<TimeSheetEntryDto> Sun { get; set; }
    }
}
