using System.Threading.Tasks;
using SarahEducation.Configuration.Dto;

namespace SarahEducation.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
