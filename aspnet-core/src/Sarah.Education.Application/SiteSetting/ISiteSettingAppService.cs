using System.Collections.Generic;
using Sarah.Education.Shared.Dto;
using Sarah.Education.SiteSetting.Dto;

namespace Sarah.Education.SiteSetting
{
    public interface ISiteSettingAppService
    {
        public Dictionary<string, List<SarahSiteSetting>> GetSiteSettingDefinitions();
        public bool ChangeSiteSettingDefinitions(IEnumerable<KeyValueDto> changeValues);
    }
}
