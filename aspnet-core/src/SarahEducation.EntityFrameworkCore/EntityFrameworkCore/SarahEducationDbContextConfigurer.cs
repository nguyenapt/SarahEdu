using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace SarahEducation.EntityFrameworkCore
{
    public static class SarahEducationDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<SarahEducationDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<SarahEducationDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
