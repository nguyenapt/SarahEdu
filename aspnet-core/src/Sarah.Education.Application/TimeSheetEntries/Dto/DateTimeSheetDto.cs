using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.TimeSheetEntries.Dto
{
    public class DateTimeSheetDto
    {
        public DateTime Date { get; set; }
        public List<StudyTimeInWeekDto> StudyTimeInWeeks { get; set; }
    }
}
