using System;
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

namespace Sarah.Education.TimeSheetEntries
{
    public class TimeSheetEntryAppService : AsyncCrudAppService<TimeSheetEntry, TimeSheetEntryDto, Guid, TimeSheetEntryResultRequestDto, CreateTimeSheetEntryDto, TimeSheetEntryDto>, ITimeSheetEntryAppService
    {
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetEntryRepository;
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetEntryStudentRepository;
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<Teacher, Guid> _teacherRepository;
        private readonly IRepository<Course, Guid> _courseRepository;
        private readonly IRepository<Room, Guid> _roomRepository;
        private readonly UserManager _userManager;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public TimeSheetEntryAppService(IRepository<TimeSheetEntry, Guid> timeSheetEntryRepository, IRepository<Course, Guid> courseRepository, IRepository<TimeSheetEntryStudent, Guid> timeSheetEntryStudentRepository, IRepository<Room, Guid> roomRepository, IRepository<Student, Guid> studentRepository, IRepository<Teacher, Guid> teacherRepository, UserManager userManager, IUnitOfWorkManager unitOfWorkManager) : base(timeSheetEntryRepository)
        {
            _timeSheetEntryRepository = timeSheetEntryRepository;
            _timeSheetEntryStudentRepository = timeSheetEntryStudentRepository;
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
            _courseRepository = courseRepository;
            _roomRepository = roomRepository;
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

            var timeSheets =  Repository.GetAllIncluding(x=>x.Teacher, x=>x.Room, x=> x.TimeSheetEntryStudents, x=>x.CourseSubject, x=>x.CourseSubject.Course, x=>x.CourseSubject.Subject)
                .WhereIf(input.RoomId.HasValue, x =>x.RoomId == input.RoomId)
                .WhereIf(teacher !=null, x => x.TeacherId == teacher.Id)
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