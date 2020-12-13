using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Sarah.Education.Configuration;

namespace Sarah.Education.Web.Host.Startup
{
    [DependsOn(
       typeof(EducationWebCoreModule))]
    public class EducationWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public EducationWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EducationWebHostModule).GetAssembly());
        }
    }
}
