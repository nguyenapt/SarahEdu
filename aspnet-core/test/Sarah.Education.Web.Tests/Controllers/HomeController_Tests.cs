using System.Threading.Tasks;
using Sarah.Education.Models.TokenAuth;
using Sarah.Education.Web.Controllers;
using Shouldly;
using Xunit;

namespace Sarah.Education.Web.Tests.Controllers
{
    public class HomeController_Tests: EducationWebTestBase
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