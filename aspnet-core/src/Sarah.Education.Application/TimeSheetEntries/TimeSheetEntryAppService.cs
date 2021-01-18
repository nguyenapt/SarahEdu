﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Sarah.Education.TimeSheetEntries.Dto;
using Abp.Application.Services.Dto;
using Sarah.Education.Students.Dto;
using Sarah.Education.TimeSheetEntryStudents.Dto;
using Abp.Collections.Extensions;
using Abp.Linq.Extensions;
using Sarah.Education.Teachers.Dto;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using Sarah.Education.Authorization.Users;
using Sarah.Education.Authorization.Roles;
using Sarah.Education.Extension;
using Sarah.Education.Rooms;
using System.Collections.Generic;
using Sarah.Education.StudyTimes.Dto;

namespace Sarah.Education.TimeSheetEntries
{
    public class TimeSheetEntryAppService : AsyncCrudAppService<TimeSheetEntry, TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>, ITimeSheetEntryAppService
    {
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetEntryRepository;
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetEntryStudentRepository;
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<Teacher, Guid> _teacherRepository;
        private readonly IRepository<StudyTime, Guid> _studyTimeRepository;
        private readonly RoomAppService _roomService;        
        private readonly UserManager _userManager;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TimeSheetEntryAppService(IRepository<TimeSheetEntry, Guid> timeSheetEntryRepository, IRepository<StudyTime, Guid> studyTimeRepository, IRepository<TimeSheetEntryStudent, Guid> timeSheetEntryStudentRepository, RoomAppService roomService, IRepository<Student, Guid> studentRepository, IRepository<Teacher, Guid> teacherRepository, UserManager userManager, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryRepository)
        {
            _timeSheetEntryRepository = timeSheetEntryRepository;
            _timeSheetEntryStudentRepository = timeSheetEntryStudentRepository;
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
            _studyTimeRepository = studyTimeRepository;
            _roomService = roomService;
            _userManager = userManager;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<TimeSheetEntryDto> CreateAsync(CreateTimeSheetEntryDto input)
        {            
            CheckCreatePermission();

            var isAvailable = await CheckAvailable(input.RoomId, input.FromDate, input.ToDate);
            if (!isAvailable){
                
                throw new UserFriendlyException("Error","The room is not available");
            }

            var timeSheet = ObjectMapper.Map<TimeSheetEntry>(input);

            var timeSheetId = await _timeSheetEntryRepository.InsertAndGetIdAsync(timeSheet);

            if (input.TimeSheetStudents != null)
            {
                CreateTimeSheetStudents(timeSheetId, input.TimeSheetStudents);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(timeSheet);
        }

        protected async Task<bool> CheckAvailable(Guid roomId, DateTime fromDate, DateTime toDate)
        {
            var timeScheduled = await Repository.FirstOrDefaultAsync(x => x.RoomId == roomId && ((x.FromDate <= fromDate && x.ToDate >= fromDate) || (x.FromDate <= toDate && x.ToDate >= toDate) || (x.FromDate >= fromDate && x.ToDate <= toDate) || (x.FromDate>= fromDate && x.ToDate >= toDate)));
            if(timeScheduled != null){
                return false;
            }
            return true;
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
                    Attitude = timeSheetStudent.Attitude,
                    ReceptiveAbility = timeSheetStudent.ReceptiveAbility,
                    Description = timeSheetStudent.Description,
                    isPaid = timeSheetStudent.isPaid,
                    Fee = timeSheetStudent.Fee
                };
                await _timeSheetEntryStudentRepository.InsertAsync(obj);
            }
        }

        public async Task<ListResultDto<TimeSheetEntryDto>> GetTimeSheetFromDateToDate(TimeSheetEntryResultRequestDto input)
        {
            var userId = AbpSession.UserId;
            var currentUser = await _userManager.GetUserByIdAsync(userId.Value);
            var roles = await _userManager.GetRolesAsync(currentUser);
            var isAdmin = roles.Contains(StaticRoleNames.Tenants.Admin);

            Teacher teacher = null;
            if (!isAdmin)
            {
                try
                {
                    teacher = _teacherRepository.Single(x => x.UserId == userId);
                }
                catch { }
            }

            var timeSheets = Repository.GetAllIncluding(x => x.Teacher, x => x.Room, x => x.TimeSheetEntryStudents, x => x.CourseSubject, x => x.CourseSubject.Course, x => x.CourseSubject.Subject)
                .WhereIf(input.RoomId.HasValue, x => x.RoomId == input.RoomId)
                .WhereIf(teacher != null, x => x.TeacherId == teacher.Id)
                .WhereIf(input.FromDate.HasValue, x => x.FromDate >= input.FromDate)
                .WhereIf(input.ToDate.HasValue, x => x.ToDate <= input.ToDate).ToList();

            var timesheetEntries = timeSheets.Select(x => new TimeSheetEntryDto()
            {
                CourseSubject = ObjectMapper.Map<Courses.Dto.CourseSubjectDto>(x.CourseSubject),
                CourseSubjectId = x.CourseSubjectId,
                FromDate = x.FromDate,
                Id = x.Id,
                RoomId = x.RoomId,
                RoomName = x.Room.Name,
                Status = x.Status,
                Teacher = ObjectMapper.Map<TeacherDto>(x.Teacher),
                TeacherId = x.TeacherId,
                ToDate = x.ToDate,
                TimeSheetEntryStudents = x.TimeSheetEntryStudents.Select(k => new TimeSheetEntryStudentDto()
                {
                    Attitude = k.Attitude,
                    Description = k.Description,
                    Fee = k.Fee,
                    ReceptiveAbility = k.ReceptiveAbility,
                    Id = k.Id,
                    StudentId = k.StudentId,
                    TimeSheetEntryId = k.TimeSheetEntryId,
                    Student = ObjectMapper.Map<StudentDto>(_studentRepository.FirstOrDefault(st => st.Id == k.StudentId))
                }).ToArray()
            }).ToList();

            return new ListResultDto<TimeSheetEntryDto>(timesheetEntries);
        }

        public async Task<ListResultDto<StudyTimeInWeekDto>> GetTimeSheetForWeek(RoomTimeSheetEntryResultRequestDto input)
        {
            var userId = AbpSession.UserId;
            var currentUser = await _userManager.GetUserByIdAsync(userId.Value);
            var roles = await _userManager.GetRolesAsync(currentUser);
            var isAdmin = roles.Contains(StaticRoleNames.Tenants.Admin);

            Teacher teacher = null;
            if (!isAdmin)
            {
                try
                {
                    teacher = _teacherRepository.Single(x => x.UserId == userId);
                }
                catch { }
            }

            var rooms = _roomService.GetRoomByCurrentTenant().Result.Select(x => new RoomTimeSheetDto
            {
                Id = x.Id,
                Name = x.Name,
                StudyTimes = new List<StudyTimeInWeekDto>()
            }).ToList();
            var studyTimes = _studyTimeRepository.GetAllListAsync().Result.Select(x=> new StudyTimeInWeekDto
            {
                Id = x.Id,
                FromHour = x.FromHour,
                ToHour = x.ToHour,
                SortOrder = x.SortOrder
            }).OrderBy(x=>x.SortOrder);

            foreach(var room in rooms)
            {
                var studyTimeTemp = studyTimes.Select(x => new StudyTimeInWeekDto
                {
                    Id = x.Id,
                    RoomId = room.Id,
                    RoomName = room.Name,
                    FromHour = x.FromHour,
                    ToHour = x.ToHour,
                    SortOrder = x.SortOrder
                }).ToList();
                room.StudyTimes.AddRange(studyTimeTemp);
            }

            var firstDayOfWeek = input.FromDate.Value.StartOfWeek(DayOfWeek.Monday);

            var timeSheets =  Repository.GetAllIncluding(x=>x.Teacher, x=>x.Room, x=> x.TimeSheetEntryStudents, x=>x.CourseSubject, x=>x.CourseSubject.Course, x=>x.CourseSubject.Subject)
                .WhereIf(teacher !=null, x => x.TeacherId == teacher.Id)
                .WhereIf(input.FromDate.HasValue, x => x.FromDate >= firstDayOfWeek)
                .WhereIf(input.FromDate.HasValue, x => x.ToDate <= firstDayOfWeek.AddDays(6)).ToList();
            
            foreach (var room in rooms)
            {
                foreach(var studyTime in room.StudyTimes)
                {
                    var monData = timeSheets.Where(x => x.RoomId == room.Id && x.StudyTimeId == studyTime.Id && x.FromDate.ToString("yyyy-MM-dd") == firstDayOfWeek.ToString("yyyy-MM-dd")).ToList();
                    studyTime.Mon = ObjectMapper.Map<List<TimeSheetEntryDto>>(monData);

                    var tueData = timeSheets.Where(x => x.RoomId == room.Id && x.StudyTimeId == studyTime.Id && x.FromDate.ToString("yyyy-MM-dd") == firstDayOfWeek.AddDays(1).ToString("yyyy-MM-dd")).ToList();
                    studyTime.Tue = ObjectMapper.Map<List<TimeSheetEntryDto>>(tueData);

                    var wedData = timeSheets.Where(x => x.RoomId == room.Id && x.StudyTimeId == studyTime.Id && x.FromDate.ToString("yyyy-MM-dd") == firstDayOfWeek.AddDays(2).ToString("yyyy-MM-dd")).ToList();
                    studyTime.Wed = ObjectMapper.Map<List<TimeSheetEntryDto>>(wedData);

                    var thuData = timeSheets.Where(x => x.RoomId == room.Id && x.StudyTimeId == studyTime.Id && x.FromDate.ToString("yyyy-MM-dd") == firstDayOfWeek.AddDays(3).ToString("yyyy-MM-dd")).ToList();
                    studyTime.Thu = ObjectMapper.Map<List<TimeSheetEntryDto>>(thuData);

                    var friData = timeSheets.Where(x => x.RoomId == room.Id && x.StudyTimeId == studyTime.Id && x.FromDate.ToString("yyyy-MM-dd") == firstDayOfWeek.AddDays(4).ToString("yyyy-MM-dd")).ToList();
                    studyTime.Fri = ObjectMapper.Map<List<TimeSheetEntryDto>>(friData);

                    var satData = timeSheets.Where(x => x.RoomId == room.Id && x.StudyTimeId == studyTime.Id && x.FromDate.ToString("yyyy-MM-dd") == firstDayOfWeek.AddDays(5).ToString("yyyy-MM-dd")).ToList();
                    studyTime.Sat = ObjectMapper.Map<List<TimeSheetEntryDto>>(satData);

                    var sunData = timeSheets.Where(x => x.RoomId == room.Id && x.StudyTimeId == studyTime.Id && x.FromDate.ToString("yyyy-MM-dd") == firstDayOfWeek.AddDays(6).ToString("yyyy-MM-dd")).ToList();
                    studyTime.Sun = ObjectMapper.Map<List<TimeSheetEntryDto>>(sunData);
                }
            }

            var listResult = rooms.SelectMany(x => x.StudyTimes).ToList();
            return new ListResultDto<StudyTimeInWeekDto>(listResult);
        }
    }
}