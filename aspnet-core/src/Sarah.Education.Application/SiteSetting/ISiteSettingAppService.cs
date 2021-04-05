using System.Collections.Generic;
using System.Threading.Tasks;
using Sarah.Education.Shared.Dto;
using Sarah.Education.SiteSetting.Dto;

namespace Sarah.Education.SiteSetting
{
    public interface ISiteSettingAppService
    {
        List<SarahListSiteSetting> GetSiteSettingDefinitions();
        void ChangeSiteSettingDefinitions(KeyValueDto[] changeValues);
    }
}
