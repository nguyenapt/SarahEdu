using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SarahEducation.Authorization;

namespace SarahEducation
{
    [DependsOn(
        typeof(SarahEducationCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SarahEducationApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SarahEducationAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SarahEducationApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
