namespace Sarah.Education.SiteSetting.Dto
{
    public class SarahSiteSetting
    {
        public SarahSiteSetting(string name, string displayname, string value)
        {
            Name = name;
            DisplayName = displayname;
            Value = value;
        }
        public string Name { get; set; }
        public string Value { get; set; }
        public string DisplayName { get; set; }
    }
}
