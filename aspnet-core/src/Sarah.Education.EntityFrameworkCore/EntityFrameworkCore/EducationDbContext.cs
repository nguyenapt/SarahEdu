using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Sarah.Education.Authorization.Roles;
using Sarah.Education.Authorization.Users;
using Sarah.Education.MultiTenancy;
using Sarah.Education.Entities;

namespace Sarah.Education.EntityFrameworkCore
{
    public class EducationDbContext : AbpZeroDbContext<Tenant, Role, User, EducationDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<ClassCentral> ClassCentrals { get; set; }
        public DbSet<ClassStudent> ClassStudents { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseFee> CourseFees { get; set; }
        public DbSet<CourseSubject> CourseSubjects { get; set; }
        public DbSet<Protector> Protectors { get; set; }
        public DbSet<ProtectorStudent> ProtectorStudents { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentCourseSubject> StudentCourseSubjects { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<TeacherSalary> TeacherSalaries { get; set; }
        public DbSet<TimeSheetEntry> TimeSheetEntries { get; set; }
        public DbSet<TimeSheetEntryStudent> TimeSheetEntryStudents { get; set; }
        public DbSet<ProtectorStudentComment> ProtectorStudentComments { get; set; }
        public DbSet<StudyTime> StudyTimes { get; set; }
        public DbSet<StudentPayment> StudentPayments { get; set; }
        public DbSet<CustomTenant> CustomTenants { get; set; }

        public EducationDbContext(DbContextOptions<EducationDbContext> options)
            : base(options)
        {
        }
    }
}
