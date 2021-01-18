using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;

namespace Sarah.Education.StudyTimes.Dto
{
    [AutoMapTo(typeof(StudyTime))]
    public class CreateStudyTimeDto
    {
        public string Name { get; set; }
        public string FromHour { get; set; }
        public string ToHour { get; set; }
        public string SortOrder { get; set; }
    }
}
