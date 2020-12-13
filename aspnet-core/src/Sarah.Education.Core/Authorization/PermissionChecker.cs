using Abp.Authorization;
using Sarah.Education.Authorization.Roles;
using Sarah.Education.Authorization.Users;

namespace Sarah.Education.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
