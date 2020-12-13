using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Sarah.Education.Controllers
{
    public abstract class EducationControllerBase: AbpController
    {
        protected EducationControllerBase()
        {
            LocalizationSourceName = EducationConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
