﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.TimeSheetEntries.Dto;
using Abp.Application.Services.Dto;
using Sarah.Education.Courses.Dto;
using Sarah.Education.Students.Dto;
using Sarah.Education.TimeSheetEntryStudents.Dto;
using Abp.Collections.Extensions;
using Abp.Linq.Extensions;
using Sarah.Education.Rooms.Dto;
using Sarah.Education.Teachers.Dto;

namespace Sarah.Education.TimeSheetEntries
{
    public class TimeSheetEntryAppService : AsyncCrudAppService<TimeSheetEntry, TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>, ITimeSheetEntryAppService
    {
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetEntryRepository;
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetEntryStudentRepository;
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<Course, Guid> _courseRepository;
        private readonly IRepository<Room, Guid> _roomRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TimeSheetEntryAppService(IRepository<TimeSheetEntry, Guid> timeSheetEntryRepository, IRepository<Course, Guid> courseRepository, IRepository<TimeSheetEntryStudent, Guid> timeSheetEntryStudentRepository, IRepository<Room, Guid> roomRepository, IRepository<Student, Guid> studentRepository, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryRepository)
        {
            _timeSheetEntryRepository = timeSheetEntryRepository;
            _timeSheetEntryStudentRepository = timeSheetEntryStudentRepository;
            _studentRepository = studentRepository;
            _courseRepository = courseRepository;
            _roomRepository = roomRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<TimeSheetEntryDto> CreateAsync(CreateTimeSheetEntryDto input)
        {            
            CheckCreatePermission();

            var timeSheet = ObjectMapper.Map<TimeSheetEntry>(input);

            var timeSheetId = await _timeSheetEntryRepository.InsertAndGetIdAsync(timeSheet);

            if (input.TimeSheetStudents != null)
            {
                CreateTimeSheetStudents(timeSheetId, input.TimeSheetStudents);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(timeSheet);
        }

        public async void CreateTimeSheetStudents(Guid timeSheetId, TimeSheetEntryStudentDto[] timeSheetEntryStudents)
        {
            foreach (var timeSheetStudent in timeSheetEntryStudents)
            {
                var obj = new TimeSheetEntryStudent
                {
                    Id = Guid.NewGuid(),
                    TimeSheetEntryId = timeSheetId,
                    StudentId = timeSheetStudent.StudentId,
                    Fee = timeSheetStudent.Fee
                };
                await _timeSheetEntryStudentRepository.InsertAsync(obj);
            }
        }        

        public async Task<ListResultDto<TimeSheetEntryDto>> GetTimeSheetFromDateToDate(TimeSheetEntryResultRequestDto input)
        {
            var timeSheets =  Repository.GetAllIncluding(x=>x.Teacher, x=> x.TimeSheetEntryStudents, x=>x.CourseSubject, x=>x.CourseSubject.Course, x=>x.CourseSubject.Subject)
                .Where(x=>x.RoomId == input.RoomId)
                .WhereIf(input.FromDate.HasValue, x => x.FromDate >= input.FromDate)
                .WhereIf(input.ToDate.HasValue, x => x.ToDate <= input.ToDate).ToList();

            var timesheetEntries = timeSheets.Select(x => new TimeSheetEntryDto()
            {
                CourseSubject = ObjectMapper.Map<Courses.Dto.CourseSubjectDto>(x.CourseSubject),
                CourseSubjectId = x.CourseSubjectId,
                FromDate = x.FromDate,
                Id = x.Id,
                RoomId = x.RoomId,
                Status = x.Status,
                Teacher = ObjectMapper.Map<TeacherDto>(x.Teacher),
                TeacherId = x.TeacherId,
                ToDate = x.ToDate,
                TimeSheetEntryStudents = x.TimeSheetEntryStudents.Select(k=> new TimeSheetEntryStudentDto()
                {
                    Attitude = k.Attitude,
                    Description = k.Description,
                    Fee = k.Fee,
                    ReceptiveAbility = k.ReceptiveAbility,
                    Id = k.Id,
                    StudentId = k.StudentId,
                    TimeSheetEntryId = k.TimeSheetEntryId,
                    Student = ObjectMapper.Map<StudentDto>(_studentRepository.FirstOrDefault(st=>st.Id == k.StudentId))
                }).ToArray()
            }).ToList();

            return new ListResultDto<TimeSheetEntryDto>(timesheetEntries);
        }
    }
}