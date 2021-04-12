using Sarah.Education.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.Protectors.Dto
{
    public class ProtectorStudentDto
    {
        public Guid ProtectorId { get; set; }
        public ProtectorDto Protector { get; set; }
        public Guid StudentId { get; set; }
        public StudentDto Student { get; set; }
    }
    
}
