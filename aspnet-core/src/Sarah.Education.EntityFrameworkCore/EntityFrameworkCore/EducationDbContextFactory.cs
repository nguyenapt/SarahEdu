using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Sarah.Education.Configuration;
using Sarah.Education.Web;

namespace Sarah.Education.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class EducationDbContextFactory : IDesignTimeDbContextFactory<EducationDbContext>
    {
        public EducationDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<EducationDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            EducationDbContextConfigurer.Configure(builder, configuration.GetConnectionString(EducationConsts.ConnectionStringName));

            return new EducationDbContext(builder.Options);
        }
    }
}
