using System.Collections.Generic;
using SarahEducation.Roles.Dto;

namespace SarahEducation.Web.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }
    }
}