using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using SarahEducation.Configuration.Dto;

namespace SarahEducation.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : SarahEducationAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
