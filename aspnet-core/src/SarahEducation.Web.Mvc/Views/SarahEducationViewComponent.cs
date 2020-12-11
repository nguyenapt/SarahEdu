using Abp.AspNetCore.Mvc.ViewComponents;

namespace SarahEducation.Web.Views
{
    public abstract class SarahEducationViewComponent : AbpViewComponent
    {
        protected SarahEducationViewComponent()
        {
            LocalizationSourceName = SarahEducationConsts.LocalizationSourceName;
        }
    }
}
