using System.Collections.Generic;
using System.Linq;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Configuration;
using Sarah.Education.Authorization;
using Sarah.Education.Shared.Dto;
using Sarah.Education.SiteSetting.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Sarah.Education.SiteSetting
{
    [AbpAuthorize(PermissionNames.Pages_SiteSettings)]
    public class SiteSettingAppService : ApplicationService, ISiteSettingAppService
    {
        private readonly ISettingManager _settingManager;

        public SiteSettingAppService(ISettingManager settingManager)
        {
            _settingManager = settingManager;
        }
        
        public List<SarahListSiteSetting> GetSiteSettingDefinitions()
        {
            return _settingManager.GetAllSettingValues().GroupBy(RuleForGroupBy).Select(x=> new SarahListSiteSetting
            {
                    Name = x.Key, Value = x.Select(s => new SarahSiteSetting(s.Name, GetDisplayName(s.Name), s.Value)).ToList()
            }).ToList();
        }

        [HttpPost]
        public bool ChangeSiteSettingDefinitions(IEnumerable<KeyValueDto> changeValues)
        {
            foreach (var changeValue in changeValues)
            {
                _settingManager.ChangeSettingForApplication(changeValue.Name, changeValue.Value);
            }
            return true;
        }

        private string RuleForGroupBy(ISettingValue setting)
        {
            if (setting.Name.Contains("Mail")) return SarahConsts.SarahSettingDefinitions.EmailSettingGroupName;
            if (setting.Name.Contains("Ldap")) return SarahConsts.SarahSettingDefinitions.LdapGroupName;
            if (setting.Name.Contains("UserManagement")) return SarahConsts.SarahSettingDefinitions.UserManagementGroupName;
            if (setting.Name.Contains("EmailTemplate")) return SarahConsts.SarahSettingDefinitions.EmailTemplateGroupName;

            return SarahConsts.SarahSettingDefinitions.SiteSettingGroupName;
        }

        private static string GetDisplayName(string name)
        {
            if (!name.Contains(".")) return name;
            var nameStrings = name.Split(".");
            var length = nameStrings.Length;
            var displayName = length >= 2 ? string.Concat(nameStrings[length - 2]," -", nameStrings[length - 1]) : nameStrings.LastOrDefault();
            return string.Concat(displayName.Select(x => char.IsUpper(x) ? " " + x : x.ToString())).TrimStart(' ');
        }
    }
}
