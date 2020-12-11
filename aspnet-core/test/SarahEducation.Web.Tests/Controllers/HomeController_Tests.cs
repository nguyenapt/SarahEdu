using System.Threading.Tasks;
using SarahEducation.Models.TokenAuth;
using SarahEducation.Web.Controllers;
using Shouldly;
using Xunit;

namespace SarahEducation.Web.Tests.Controllers
{
    public class HomeController_Tests: SarahEducationWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}