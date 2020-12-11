using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SarahEducation.Configuration;
using SarahEducation.Web;

namespace SarahEducation.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class SarahEducationDbContextFactory : IDesignTimeDbContextFactory<SarahEducationDbContext>
    {
        public SarahEducationDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<SarahEducationDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            SarahEducationDbContextConfigurer.Configure(builder, configuration.GetConnectionString(SarahEducationConsts.ConnectionStringName));

            return new SarahEducationDbContext(builder.Options);
        }
    }
}
