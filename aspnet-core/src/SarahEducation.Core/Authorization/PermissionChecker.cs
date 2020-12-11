using Abp.Authorization;
using SarahEducation.Authorization.Roles;
using SarahEducation.Authorization.Users;

namespace SarahEducation.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
