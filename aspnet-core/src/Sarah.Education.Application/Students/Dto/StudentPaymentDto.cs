using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.Students.Dto
{
    [AutoMapFrom(typeof(StudentPayment))]
    [AutoMapTo(typeof(StudentPayment))]
    public class StudentPaymentDto
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public double PaymentAmount { get; set; }
        public DateTime DateOfPayment { get; set; }
        public DateTime PaidForMonth { get; set; }
    }
}
