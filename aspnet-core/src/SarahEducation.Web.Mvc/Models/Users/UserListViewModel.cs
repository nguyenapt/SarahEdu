using System.Collections.Generic;
using SarahEducation.Roles.Dto;

namespace SarahEducation.Web.Models.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}
