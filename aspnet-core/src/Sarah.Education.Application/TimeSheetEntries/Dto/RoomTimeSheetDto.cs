using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.StudyTimes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.TimeSheetEntries.Dto
{
    public class RoomTimeSheetDto 
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<StudyTimeInWeekDto> StudyTimes { get; set; }
    }
}
