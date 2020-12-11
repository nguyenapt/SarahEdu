using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using SarahEducation.Authorization.Roles;
using SarahEducation.Authorization.Users;
using SarahEducation.MultiTenancy;
using SarahEducation.Entities;

namespace SarahEducation.EntityFrameworkCore
{
    public class SarahEducationDbContext : AbpZeroDbContext<Tenant, Role, User, SarahEducationDbContext>
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
        public DbSet<TimeSheetEntry> TimeSheetEntries { get; set; }
        public DbSet<TimeSheetEntryStudent> TimeSheetEntryStudents { get; set; }

        public SarahEducationDbContext(DbContextOptions<SarahEducationDbContext> options)
            : base(options)
        {
        }
    }
}
