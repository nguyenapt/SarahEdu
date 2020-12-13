using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Sarah.Education.Authorization;

namespace Sarah.Education
{
    [DependsOn(
        typeof(EducationCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class EducationApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<EducationAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(EducationApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
