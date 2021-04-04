namespace ET.Email.Dto
{
    public class SubmitLeavePermissionEmailDto
    {
        public string ApprovalEmail { get; set; }
        public string SubmitterFullName { get; set; }
        public string ApprovalFullName { get; set; }
        public string LeaveFromTime { get; set; }
        public string LeaveToTime { get; set; }
        public string LeaveType { get; set; }
        public string Reason { get; set; }

        public string RejectReason { get; set; }
        public string ApproveTimeSheetLink { get; set; }
        public string EmailSupport { get; set; }
        public string SkypeSupport { get; set; }
    }
}
