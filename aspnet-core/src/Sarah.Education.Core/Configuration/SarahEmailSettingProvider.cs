using System.Collections.Generic;
using Abp.Configuration;

namespace Sarah.Education.Configuration
{
    public class SarahEmailSettingProvider : SettingProvider
    {
        public override IEnumerable<SettingDefinition> GetSettingDefinitions(SettingDefinitionProviderContext context)
        {
            return new[]
            {
                new SettingDefinition(
                    SarahConsts.SarahEmailSettings.EnableSmtp,
                    "false"
                ),

                new SettingDefinition(
                    $"{SarahConsts.SarahEmailSettings.SendFeeTemplateResourceName}.{SarahConsts.SarahEmailSettings.AllocatedResourceTitle}",
                    SarahConsts.EmailTemplate.SendFeeTemplate.Title
                ),

                new SettingDefinition(
                    $"{SarahConsts.SarahEmailSettings.SendFeeTemplateResourceName}.{SarahConsts.SarahEmailSettings.AllocatedResourceBody}",
                    SarahConsts.EmailTemplate.SendFeeTemplate.Content
                ),

                new SettingDefinition(
                    $"{SarahConsts.SarahEmailSettings.SendWarningTemplateResourceName}.{SarahConsts.SarahEmailSettings.AllocatedResourceTitle}",
                    SarahConsts.EmailTemplate.SendWarningTemplate.Title
                ),

                new SettingDefinition(
                    $"{SarahConsts.SarahEmailSettings.SendWarningTemplateResourceName}.{SarahConsts.SarahEmailSettings.AllocatedResourceBody}",
                    SarahConsts.EmailTemplate.SendWarningTemplate.Content
                ),
            };
        }
    }
}
