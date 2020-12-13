using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Sarah.Education.EntityFrameworkCore;
using Sarah.Education.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Sarah.Education.Web.Tests
{
    [DependsOn(
        typeof(EducationWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class EducationWebTestModule : AbpModule
    {
        public EducationWebTestModule(EducationEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EducationWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(EducationWebMvcModule).Assembly);
        }
    }
}