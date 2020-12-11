using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace SarahEducation.Controllers
{
    public abstract class SarahEducationControllerBase: AbpController
    {
        protected SarahEducationControllerBase()
        {
            LocalizationSourceName = SarahEducationConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
