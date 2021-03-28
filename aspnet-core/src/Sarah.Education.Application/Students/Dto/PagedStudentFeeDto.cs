using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.Students.Dto
{
    public class PagedStudentFeeDto
    {
        public int TotalCount { get; set; }
        public double TotalFee { get; set; }
        public double TotalPayment { get; set; }
        public List<StudentFeeDto> Items { get; set; }
    }
}
