using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SarahEducation.EntityFrameworkCore;
using SarahEducation.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace SarahEducation.Web.Tests
{
    [DependsOn(
        typeof(SarahEducationWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class SarahEducationWebTestModule : AbpModule
    {
        public SarahEducationWebTestModule(SarahEducationEntityFrameworkModule SarahEducationEntityFrameworkModule)
        {
            SarahEducationEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SarahEducationWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(SarahEducationWebMvcModule).Assembly);
        }
    }
}