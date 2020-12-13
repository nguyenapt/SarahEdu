using Abp.Application.Services.Dto;

namespace Sarah.Education.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

