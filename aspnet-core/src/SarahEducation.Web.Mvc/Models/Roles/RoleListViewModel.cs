using System.Collections.Generic;
using SarahEducation.Roles.Dto;

namespace SarahEducation.Web.Models.Roles
{
    public class RoleListViewModel
    {
        public IReadOnlyList<PermissionDto> Permissions { get; set; }
    }
}
