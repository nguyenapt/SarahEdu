using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;
using Abp.Dependency;

namespace Sarah.Education.Email.Helper
{
    public interface IEmailHelper : ITransientDependency
    {
        Task<bool> SendMailGenericAsync<T>(
            string emailTemplateType,
            IEnumerable<string> toAddresses,
            IEnumerable<string> toCcAddresses,
            IEnumerable<string> toBccAddresses,
            T modelInput,
            IEnumerable<Attachment> attachments);

        void SendMailAsync<T>(
           string emailTemplateType,
           IEnumerable<string> toAddresses,
           IEnumerable<string> toCcAddresses,
           IEnumerable<string> toBccAddresses,
           T modelInput,
           IEnumerable<Attachment> attachments);
    }
}
