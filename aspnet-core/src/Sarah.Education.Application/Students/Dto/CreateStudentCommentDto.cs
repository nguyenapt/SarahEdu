using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Students.Dto
{
    [AutoMapTo(typeof(ProtectorStudentComment))]
    public class CreateStudentCommentDto
    {
        public Guid StudentId { get; set; }
        public Guid? ProtectorId { get; set; }
        public DateTime? CommentDate { get; set; }
        public string Comment { get; set; }
    }
}
