namespace Sarah.Education.Shared.Dto
{
    public class KeyDecimalValue : IKeyValue
    {
        public string Name { get; set; }
        public object Value { get; set; }
        public string ToDisplayValue()
        {
            return Value == null ? string.Empty : $"{Value:0,0.00}";
        }
    }
}
