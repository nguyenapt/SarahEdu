using Microsoft.AspNetCore.Mvc;
using Abp.AspNetCore.Mvc.Authorization;
using SarahEducation.Controllers;

namespace SarahEducation.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : SarahEducationControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
