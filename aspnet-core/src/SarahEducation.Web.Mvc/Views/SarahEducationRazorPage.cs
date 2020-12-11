using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace SarahEducation.Web.Views
{
    public abstract class SarahEducationRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected SarahEducationRazorPage()
        {
            LocalizationSourceName = SarahEducationConsts.LocalizationSourceName;
        }
    }
}
