using System;

namespace Sarah.Education.Students.Dto
{
    public class StudentCommentResultRequestDto
    {
        public Guid? StudentId { get; set; }
        public Guid? ProtectorId { get; set; }
    }
}
