using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Net.Mail;
using Abp.Net.Mail.Smtp;

namespace Sarah.Education.Email.Helper
{
    public class ETEmailHelper : IETEmailHelper
    {
        private readonly IEmailSender _emailSender;
        private readonly ISmtpEmailSenderConfiguration _configuration;
        private readonly ISettingManager _settingManager;

        protected virtual string ReplacementKeyStartsWith { get; set; } = "{{";
        protected virtual string ReplacementKeyEndsWith { get; set; } = "}}";

        public ETEmailHelper(
            IEmailSender emailSender,
            ISmtpEmailSenderConfiguration configuration,
            ISettingManager settingManager)
        {
            _emailSender = emailSender;
            _settingManager = settingManager;
            _configuration = configuration;
        }

        public async Task<bool> SendMailGenericAsync<T>(
            string emailTemplateType,
            IEnumerable<string> toAddresses,
            IEnumerable<string> toCcAddresses,
            IEnumerable<string> toBccAddresses,
            T modelInput,
            IEnumerable<Attachment> attachments)
        {
            if (_settingManager.GetSettingValue(SarahConsts.SarahEmailSettings.EnableSmtp) == "false")
                return false;

            var mail = new MailMessage();

            foreach (var toAddress in toAddresses)
            {
                mail.To.Add(toAddress);
            }

            mail.From = new MailAddress(_configuration.DefaultFromAddress, _configuration.DefaultFromDisplayName);

            // TO CC
            if (toCcAddresses != null && toCcAddresses.Any())
            {
                foreach (var ccAddress in toCcAddresses)
                {
                    mail.CC.Add(ccAddress);
                }
            }

            // TO BCC
            if (toBccAddresses != null && toBccAddresses.Any())
            {
                foreach (var bccAddress in toBccAddresses)
                {
                    mail.Bcc.Add(bccAddress);
                }
            }

            mail.Subject = ReplaceContent(_settingManager.GetSettingValue($"{emailTemplateType}.{SarahConsts.SarahEmailSettings.AllocatedResourceTitle}"), modelInput);

            mail.SubjectEncoding = Encoding.UTF8;

            mail.Body = ReplaceContent(_settingManager.GetSettingValue($"{emailTemplateType}.{SarahConsts.SarahEmailSettings.AllocatedResourceBody}"), modelInput);

            if (attachments != null && attachments.Any())
            {
                foreach (var attachment in attachments)
                {
                    mail.Attachments.Add(attachment);
                }
            }
            mail.IsBodyHtml = true;
            mail.BodyEncoding = Encoding.UTF8;

            await _emailSender.SendAsync(mail);
            return true;
        }

        public void SendMailAsync<T>(
          string emailTemplateType,
          IEnumerable<string> toAddresses,
          IEnumerable<string> toCcAddresses,
          IEnumerable<string> toBccAddresses,
          T modelInput,
          IEnumerable<Attachment> attachments)
        {
            if (_settingManager.GetSettingValue(SarahConsts.SarahEmailSettings.EnableSmtp) == "false")
                return;

            var mail = new MailMessage();

            foreach (var toAddress in toAddresses)
            {
                mail.To.Add(toAddress);
            }

            mail.From = new MailAddress(_configuration.DefaultFromAddress, _configuration.DefaultFromDisplayName);

            // TO CC
            if (toCcAddresses != null && toCcAddresses.Any())
            {
                foreach (var ccAddress in toCcAddresses)
                {
                    mail.CC.Add(ccAddress);
                }
            }

            // TO BCC
            if (toBccAddresses != null && toBccAddresses.Any())
            {
                foreach (var bccAddress in toBccAddresses)
                {
                    mail.Bcc.Add(bccAddress);
                }
            }

            mail.Subject = ReplaceContent(_settingManager.GetSettingValue($"{emailTemplateType}.{SarahConsts.SarahEmailSettings.AllocatedResourceTitle}"), modelInput);

            mail.SubjectEncoding = Encoding.UTF8;

            mail.Body = ReplaceContent(_settingManager.GetSettingValue($"{emailTemplateType}.{SarahConsts.SarahEmailSettings.AllocatedResourceBody}"), modelInput);

            if (attachments != null && attachments.Any())
            {
                foreach (var attachment in attachments)
                {
                    mail.Attachments.Add(attachment);
                }
            }
            mail.IsBodyHtml = true;
            mail.BodyEncoding = Encoding.UTF8;

            _emailSender.SendAsync(mail);       
        }

        public virtual string ReplaceContent<T>(string orignalContent, T modelInput)
        {
            if (string.IsNullOrWhiteSpace(orignalContent)) return orignalContent;

            var replacementKeys = GetReplacementKeys(orignalContent);
            if (!replacementKeys.Any()) return orignalContent;

            var replacedBody = orignalContent;
            foreach (var key in replacementKeys)
            {
                var propertyName = key.Replace(ReplacementKeyStartsWith, string.Empty)
                    .Replace(ReplacementKeyEndsWith, string.Empty);
                var propertyInfo = modelInput.GetType().GetProperty(propertyName);
                var value = propertyInfo == null ? string.Empty : propertyInfo.GetValue(modelInput);
                replacedBody = replacedBody.Replace(key, value?.ToString() ?? string.Empty);
            }
            return replacedBody;
        }

        private List<string> GetReplacementKeys(string body)
        {
            var matches = Regex.Matches(body, $"{ReplacementKeyStartsWith}(.*?){ReplacementKeyEndsWith}");

            var resultKeys = new List<string>();
            foreach (Match m in matches)
            {
                resultKeys.Add(m.Value);
            }
            return resultKeys;
        }
    }
}
