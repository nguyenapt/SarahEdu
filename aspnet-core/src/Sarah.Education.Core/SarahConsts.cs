namespace Sarah.Education
{
    public class SarahConsts
    {
        public class SarahSettingDefinitions
        {
            public const string EmailSettingGroupName = "SMTP Setting";
            public const string SiteSettingGroupName = "Site Setting";
            public const string LdapGroupName = "Ldap Setting";
            public const string UserManagementGroupName = "User Management Setting";
            public const string EmailTemplateGroupName = "Email Template Setting";
        }

        public class SarahEmailSettings
        {
            public const string EnableSmtp = "Abp.Net.Mail.Smtp.Enable";
            public const string SendFeeTemplateResourceName = "EmailTemplate.SendFeeTemplate";
            public const string SendWarningTemplateResourceName = "EmailTemplate.SendWarningTemplate";

            public const string AllocatedResourceBody = "Body";
            public const string AllocatedResourceTitle = "Title";

        }

        public class EmailTemplate
        {            
            // Send email to notify PM that an user has submitted his or her leave
            public class SendFeeTemplate
            {
                public const string Title = "Sarah Education - Thông báo đóng tiền học phí";
                public const string Content = @"<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <title>Sarah Education - Thông báo đóng tiền học phí</title>
    <style type='text/css'>
        h1, h2, h3, body, p, div, span, ul, li {margin: 0; padding: 0; font-size: 100%;}
        a {text-decoration:none;}
        body {color:#000; font-family:Arial, Helvetica, sans-serif; line-height:20px; background:#cacaca;}
       
        a:hover {text-decoration:underline;}
         img {
        border:none;        
        }
    </style>
</head>

<body>
	<center>
<table style='
    border-spacing: 0px;
    margin: 20px auto;
    width: 600px;
'>
		<tbody>
		<tr style='vertical-align: bottom;background-color: #f0ba00;'>
			<td style='width:156px;height:50px;margin: 0px;padding: 0px;vertical-align: top;'>			
			</td>
			<td style='background-color:#f0ba00;float:right;color:#FFF;text-align:right;margin:40px 10px 0px 0px;width:100%;height:40px'>
				<b>Thông báo đóng tiền học phí</b>
			</td>
		</tr>
		<tr>
			<td colspan='2' style='padding:30px 20px; background:#fff; font-size:12px;'>
				<h2>Dear {{ProtectorFullName}},</h2>
				<br/>
                <p>Chúng tôi xin gửi đến quý phụ huynh thông báo tiền học phí của con: {{StudentFullName}} trong tháng {{Month}}, thông tin chi tiết quý phụ huynh có thể xem trong bảng sau:</p>
		        <br/>	
                {{Detail}}
                <p>Có bất kỳ câu hỏi nào xin quý phụ huynh vui lòng liên hệ theo thông tin sau</p>
				<br/>
				<div class='link' align='center'> 	Email: {{EmailSupport}}
				<br/> 	Phone number: {{PhoneSupport}} </div>
				<br/> <br/>
				Sarah Education Group
			</td>
		</tr>
		<tr>
			<td colspan='2' style='text-align:center; height: 35px; vertical-align: middle; background:#05022b;font-size:12px; color:#fff'>
				<a style='font-size:12px; color:#fff;text-decoration:none;' href='https://www.facebook.com/sarahlearningsupportcenter/'>Like on Facebook</a> | <a style='font-size:12px; color:#fff;text-decoration:none;' href='https://sarah-edu.com/'>Visit our website</a>
			</td>
		</tr>
	</tbody>
</table>
</center>
</body>
</html>";
            }

            public class SendWarningTemplate
            {
                public const string Title = "Sarah Education - Thông báo tình hình học tập";
                public const string Content = @"<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <title>Sarah Education - Thông báo tình hình học tập</title>
    <style type='text/css'>
        h1, h2, h3, body, p, div, span, ul, li {margin: 0; padding: 0; font-size: 100%;}
        a {text-decoration:none;}
        body {color:#000; font-family:Arial, Helvetica, sans-serif; line-height:20px; background:#cacaca;}
       
        a:hover {text-decoration:underline;}
         img {
        border:none;        
        }
    </style>
</head>

<body>
	<center>
<table style='
    border-spacing: 0px;
    margin: 20px auto;
    width: 600px;
'>
		<tbody>
		<tr style='vertical-align: bottom;background-color: #dc3545;'>
			<td style='width:156px;height:50px;margin: 0px;padding: 0px;vertical-align: top;'>			
			</td>
			<td style='background-color:#dc3545;float:right;color:#FFF;text-align:right;margin:40px 10px 0px 0px;width:100%;height:40px'>
				<b>Thông báo tình hình học tập</b>
			</td>
		</tr>
		<tr>
			<td colspan='2' style='padding:30px 20px; background:#fff; font-size:12px;'>
				<h2>Dear {{ProtectorFullName}},</h2>
				<br/>
                <p>Chúng tôi xin gửi đến quý phụ huynh tình hình học tập của con: {{StudentFullName}} trong tháng {{Month}}, thông tin chi tiết quý phụ huynh có thể xem trong bảng sau:</p>
		        <br/>	
                {{Detail}}
                <p>Có bất kỳ câu hỏi nào xin quý phụ huynh vui lòng liên hệ theo thông tin sau</p>
				<br/>
				<div class='link' align='center'> 	Email: {{EmailSupport}}
				<br/> 	Phone number: {{PhoneSupport}} </div>
				<br/> <br/>
				Sarah Education Group
			</td>
		</tr>
		<tr>
			<td colspan='2' style='text-align:center; height: 35px; vertical-align: middle; background:#05022b;font-size:12px; color:#fff'>
				<a style='font-size:12px; color:#fff;text-decoration:none;' href='https://www.facebook.com/sarahlearningsupportcenter/'>Like on Facebook</a> | <a style='font-size:12px; color:#fff;text-decoration:none;' href='https://sarah-edu.com/'>Visit our website</a>
			</td>
		</tr>
	</tbody>
</table>
</center>
</body>
</html>";
            }
        }
    }
}
