using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace SarahEducation.Localization
{
    public static class SarahEducationLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(SarahEducationConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(SarahEducationLocalizationConfigurer).GetAssembly(),
                        "SarahEducation.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
