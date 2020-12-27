﻿using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Entities;
using Sarah.Education.Students.Dto;
using Sarah.Education.Teachers.Dto;

namespace Sarah.Education.TimeSheetEntries.Dto
{
    [AutoMapFrom(typeof(TimeSheetEntry))]
    [AutoMapTo(typeof(TimeSheetEntry))]
    public class TimeSheetEntryDto : EntityDto<Guid>
    {        
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }        
        public Guid RoomId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid CourseSubjectId { get; set; }
        public double Fee { get; set; }
        public int Status { get; set; }
        public TeacherDto Teacher { get; set; }
        public CourseSubjectDto CourseSubject { get; set; }
    }
}
