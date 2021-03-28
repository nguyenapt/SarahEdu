using Sarah.Education.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.ClassCentrals.Dto
{
    public class ClassWithStudentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public StudentDto[] Students { get; set; }
    }
}
