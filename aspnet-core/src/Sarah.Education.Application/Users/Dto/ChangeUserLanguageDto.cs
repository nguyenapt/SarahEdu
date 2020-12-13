using System.ComponentModel.DataAnnotations;

namespace Sarah.Education.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}