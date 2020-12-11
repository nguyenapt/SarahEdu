using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SarahEducation.Configuration;

namespace SarahEducation.Web.Host.Startup
{
    [DependsOn(
       typeof(SarahEducationWebCoreModule))]
    public class SarahEducationWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public SarahEducationWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SarahEducationWebHostModule).GetAssembly());
        }
    }
}
