using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Sarah.Education.EntityFrameworkCore
{
    public static class EducationDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<EducationDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<EducationDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
