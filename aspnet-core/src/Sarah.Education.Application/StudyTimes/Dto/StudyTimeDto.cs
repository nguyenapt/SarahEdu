using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.TimeSheetEntries.Dto;

namespace Sarah.Education.StudyTimes.Dto
{
    [AutoMapFrom(typeof(StudyTime))]
    [AutoMapTo(typeof(StudyTime))]
    public class StudyTimeDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string FromHour { get; set; }
        public string ToHour { get; set; }
        public string SortOrder { get; set; }
        public List<TimeSheetEntryDto> TimeSheetEntries { get; set; }
    }
}
