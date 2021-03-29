using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Sarah.Education.Entities;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using Sarah.Education.Students.Dto;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Sarah.Education.Subjects.Dto;
using Abp.Extensions;
using Abp.Linq.Extensions;

namespace Sarah.Education.Students
{
    public class StudentAppService : AsyncCrudAppService<Student, StudentDto, Guid, StudentResultRequestDto, CreateStudentDto, StudentDto>, IStudentAppService
    {
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<StudentPayment, Guid> _studentPaymentRepository;
        private readonly IRepository<ProtectorStudentComment, Guid> _protectorStudentCommentRepository;
        private readonly IRepository<ProtectorStudent, Guid> _protectorStudentRepository;
        private readonly IRepository<CourseSubject, Guid> _courseSubjectRepository;
        private readonly IRepository<StudentCourseSubject, Guid> _studentCourseSubjectRepository;
        private readonly IRepository<TimeSheetEntry, Guid> _timeSheetRepository;
        private readonly IRepository<TimeSheetEntryStudent, Guid> _timeSheetStudentRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public StudentAppService(IRepository<Student, Guid> studentRepository, IRepository<StudentPayment, Guid> studentPaymentRepository, IRepository<ProtectorStudentComment, Guid> protectorStudentCommentRepository, IRepository<ProtectorStudent, Guid> protectorStudentRepository, IRepository<CourseSubject, Guid> courseSubjectRepository, IRepository<StudentCourseSubject, Guid> studentCourseSubjectRepository, IRepository<TimeSheetEntry, Guid> timeSheetRepository, IRepository<TimeSheetEntryStudent, Guid> timeSheetStudentRepository, IUnitOfWorkManager unitOfWorkManager) : base(studentRepository)
        {
            _studentRepository = studentRepository;
            _studentPaymentRepository = studentPaymentRepository;
            _protectorStudentCommentRepository = protectorStudentCommentRepository;
            _protectorStudentRepository = protectorStudentRepository;
            _courseSubjectRepository = courseSubjectRepository;
            _studentCourseSubjectRepository = studentCourseSubjectRepository;
            _timeSheetRepository = timeSheetRepository;
            _timeSheetStudentRepository = timeSheetStudentRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async override Task<StudentDto> CreateAsync(CreateStudentDto input)
        {
            CheckCreatePermission();

            Student student = ObjectMapper.Map<Student>(input);

            var studentId = Repository.InsertAndGetId(student);

            if (input.CourseSubjects != null)
            {
                CreateStudentCourseSubject(studentId, input.CourseSubjects);
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(student);
        }

        public async override Task<StudentDto> UpdateAsync(StudentDto input)
        {
            CheckUpdatePermission();

            var student = _studentRepository.FirstOrDefault(x => x.Id == input.Id);

            MapToEntity(input, student);

            await _studentRepository.UpdateAsync(student);

            if (input.CourseSubjects != null)
            {
                CreateStudentCourseSubject(student.Id, input.CourseSubjects);
            }

            CurrentUnitOfWork.SaveChanges();

            return await GetAsync(input);
        }

        public async void CreateStudentCourseSubject(Guid studentId, Guid[] courseSubjectIds)
        {
            _studentCourseSubjectRepository.Delete(x => x.StudentId == studentId);

            foreach (var courseSubjectId in courseSubjectIds)
            {
                var courseSubject = _courseSubjectRepository.FirstOrDefault(x => x.Id == courseSubjectId);
                if (courseSubject != null)
                {
                    var studentCourseSubject = new StudentCourseSubject();
                    studentCourseSubject.Id = Guid.NewGuid();
                    studentCourseSubject.StudentId = studentId;
                    studentCourseSubject.CourseSubjectId = courseSubjectId;
                    await _studentCourseSubjectRepository.InsertAsync(studentCourseSubject);
                }
            }
        }

        protected override StudentDto MapToEntityDto(Student entity)
        {
            var courseSubjectIds = _studentCourseSubjectRepository.GetAll().Where(x => x.StudentId == entity.Id).Select(x => x.CourseSubjectId).ToArray();
            var studentDto = base.MapToEntityDto(entity);
            studentDto.CourseSubjects = courseSubjectIds;

            return studentDto;
        }

        protected override IQueryable<Student> CreateFilteredQuery(StudentResultRequestDto input)
        {
            return Repository.GetAllIncluding()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.FullName.Contains(input.Keyword)
                       || x.Email.Contains(input.Keyword)
                       || x.SchoolName.Contains(input.Keyword)
                       || x.ClassName.Contains(input.Keyword)
                       || x.Description.Contains(input.Keyword));
        }

        public async Task<ListResultDto<StudentDto>> GetStudents()
        {
            var students = Repository.GetAllList();
            return new ListResultDto<StudentDto>(ObjectMapper.Map<List<StudentDto>>(students));
        }

        public async Task<PagedStudentFeeDto> GetStudentFees(StudentFeeResultRequestDto input)
        {
            var list = _timeSheetStudentRepository.GetAllIncluding(
                x => x.TimeSheetEntry,
                x => x.TimeSheetEntry.Teacher,
                x => x.TimeSheetEntry.Room,
                x => x.Student.StudentPayments,
                x => x.TimeSheetEntry.CourseSubject.Course,
                x => x.TimeSheetEntry.CourseSubject.Subject)
                .Where(x => x.StudentId == input.StudentId)
                .WhereIf(input.FromDate.HasValue, x => x.TimeSheetEntry.FromDate >= input.FromDate)
                .WhereIf(input.ToDate.HasValue, x => x.TimeSheetEntry.ToDate <= input.ToDate).ToList();

            var payments = _studentPaymentRepository.GetAllIncluding()
                .Where(x => x.StudentId == input.StudentId)
                .WhereIf(input.FromDate.HasValue, x => x.PaidForMonth >= input.FromDate)
                .WhereIf(input.ToDate.HasValue, x => x.PaidForMonth <= input.ToDate).ToList();

            var returnList = list
            .Skip(input.SkipCount)
            .Take(input.MaxResultCount)
            .Select(d => new StudentFeeDto
            {
                SubjectName = d.TimeSheetEntry.CourseSubject.Subject.Name,
                CourseName = d.TimeSheetEntry.CourseSubject.Course.Name,
                RoomName = d.TimeSheetEntry.Room.Name,
                TeacherName = d.TimeSheetEntry.Teacher.FullName,
                StartDate = d.TimeSheetEntry.FromDate,
                EndDate = d.TimeSheetEntry.ToDate,
                Fee = d.Fee,
                IsSingle = d.TimeSheetEntry.IsSingle
            }).ToList();

            return new PagedStudentFeeDto() { TotalCount = list.Count, TotalFee = list.Sum(x=>x.Fee), TotalPayment = payments.Sum(x=>x.PaymentAmount), Items = returnList };
        }

        public async Task<ListResultDto<StudentPaymentDto>> GetStudentPayments(StudentPaymentResultRequestDto input)
        {
            var studentPayments = _studentPaymentRepository.GetAllIncluding()
                .Where(x => x.StudentId == input.StudentId)
                .WhereIf(input.FromDate.HasValue, x => x.PaidForMonth >= input.FromDate)
                .WhereIf(input.ToDate.HasValue, x => x.PaidForMonth <= input.ToDate)
                .Select(x =>
                  new StudentPaymentDto
                  {
                      Id = x.Id,
                      StudentId = x.StudentId,
                      PaymentAmount = x.PaymentAmount,
                      DateOfPayment = x.DateOfPayment,
                      PaidForMonth = x.PaidForMonth
                  }
                );
            return new ListResultDto<StudentPaymentDto>(ObjectMapper.Map<List<StudentPaymentDto>>(studentPayments));
        }


        public async Task<StudentPaymentDto> CreatePaymentAsync(CreateStudentPaymentDto input)
        {
            CheckCreatePermission();

            StudentPayment studentPayment = ObjectMapper.Map<StudentPayment>(input);

            await _studentPaymentRepository.InsertAsync(studentPayment);

            CurrentUnitOfWork.SaveChanges();

            var entityDto =  ObjectMapper.Map<StudentPaymentDto>(studentPayment);
            return entityDto;
        }

        public async Task<StudentPaymentDto> UpdatePaymentAsync(StudentPaymentDto input)
        {
            CheckUpdatePermission();

            var studentPayment = _studentPaymentRepository.FirstOrDefault(x => x.Id == input.Id);
            if (studentPayment != null)
            {
                studentPayment.PaymentAmount = input.PaymentAmount;
                studentPayment.DateOfPayment = input.DateOfPayment;
                studentPayment.PaidForMonth = input.PaidForMonth;
            }

            await _studentPaymentRepository.UpdateAsync(studentPayment);

            CurrentUnitOfWork.SaveChanges();

            return ObjectMapper.Map<StudentPaymentDto>(studentPayment);
        }

        public async Task DeletePaymentAsync(EntityDto<Guid> input)
        {
            var payment = await _studentPaymentRepository.GetAsync(input.Id);
            await _studentPaymentRepository.DeleteAsync(payment);
        }


        public async Task<ListResultDto<StudentCommentDto>> GetStudentComments(StudentCommentResultRequestDto input)
        {
            var studentComments = _protectorStudentCommentRepository.GetAllIncluding()
                .WhereIf(input.StudentId.HasValue, x => x.StudentId == input.StudentId)
                .WhereIf(input.ProtectorId.HasValue, x => x.ProtectorId == input.ProtectorId)
                .OrderByDescending(x=>x.CommentDate)
                .Select(x =>
                  new StudentCommentDto
                  {
                      Id = x.Id,
                      StudentId = x.StudentId,
                      ProtectorId = x.ProtectorId,
                      CommentDate = x.CommentDate,
                      Comment = x.Comment
                  }
                );
            return new ListResultDto<StudentCommentDto>(ObjectMapper.Map<List<StudentCommentDto>>(studentComments));
        }


        public async Task<StudentCommentDto> CreateCommentAsync(CreateStudentCommentDto input)
        {
            CheckCreatePermission();

            ProtectorStudentComment studentComment = ObjectMapper.Map<ProtectorStudentComment>(input);

            var protector = _protectorStudentRepository.GetAllIncluding().Where(x => x.StudentId == input.StudentId && x.Protector.IsActive).FirstOrDefault();
            if(protector != null)
            {
                studentComment.ProtectorId = protector.ProtectorId;
            }

            await _protectorStudentCommentRepository.InsertAsync(studentComment);

            CurrentUnitOfWork.SaveChanges();

            var entityDto = ObjectMapper.Map<StudentCommentDto>(studentComment);
            return entityDto;
        }

        public async Task<StudentCommentDto> UpdateCommentAsync(StudentCommentDto input)
        {
            CheckUpdatePermission();

            var studentComment = _protectorStudentCommentRepository.FirstOrDefault(x => x.Id == input.Id);
            if (studentComment != null)
            {
                studentComment.StudentId = input.StudentId;
                studentComment.ProtectorId = input.ProtectorId;
                studentComment.CommentDate = input.CommentDate;
                studentComment.Comment = input.Comment;
            }

            await _protectorStudentCommentRepository.UpdateAsync(studentComment);

            CurrentUnitOfWork.SaveChanges();

            return ObjectMapper.Map<StudentCommentDto>(studentComment);
        }

        public async Task DeleteCommentAsync(EntityDto<Guid> input)
        {
            var comment = await _protectorStudentCommentRepository.GetAsync(input.Id);
            await _protectorStudentCommentRepository.DeleteAsync(comment);
        }
    }
}