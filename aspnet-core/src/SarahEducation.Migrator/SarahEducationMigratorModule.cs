using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SarahEducation.Configuration;
using SarahEducation.EntityFrameworkCore;
using SarahEducation.Migrator.DependencyInjection;

namespace SarahEducation.Migrator
{
    [DependsOn(typeof(SarahEducationEntityFrameworkModule))]
    public class SarahEducationMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public SarahEducationMigratorModule(SarahEducationEntityFrameworkModule SarahEducationEntityFrameworkModule)
        {
            SarahEducationEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(SarahEducationMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                SarahEducationConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SarahEducationMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
