using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.Teachers.Dto
{
    public class PagedTeacherProductivityTotalDto
    {
        public int TotalCount { get; set; }
        public double TotalFee { get; set; }
        public double TotalHour { get; set; }
        public List<TeacherProductivityTotalDto> Items { get; set; }
    }
}
