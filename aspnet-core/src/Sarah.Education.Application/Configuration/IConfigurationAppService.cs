using System.Threading.Tasks;
using Sarah.Education.Configuration.Dto;

namespace Sarah.Education.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
