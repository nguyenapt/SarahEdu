using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Students.Dto
{
    [AutoMapFrom(typeof(ProtectorStudentComment))]
    [AutoMapTo(typeof(ProtectorStudentComment))]
    public class StudentCommentDto
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Guid? ProtectorId { get; set; }
        public DateTime? CommentDate { get; set; }
        public string Comment { get; set; }
    }
}
