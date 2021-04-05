using System.Collections.Generic;
using Sarah.Education.Shared.Dto;
using Sarah.Education.SiteSetting.Dto;

namespace Sarah.Education.SiteSetting
{
    public interface ISiteSettingAppService
    {
        List<SarahListSiteSetting> GetSiteSettingDefinitions();
        bool ChangeSiteSettingDefinitions(IEnumerable<KeyValueDto> changeValues);
    }
}
