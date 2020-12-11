using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SarahEducation.Roles.Dto;
using SarahEducation.Users.Dto;

namespace SarahEducation.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);

        Task<bool> ChangePassword(ChangePasswordDto input);
    }
}
