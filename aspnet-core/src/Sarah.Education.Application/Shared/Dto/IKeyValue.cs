namespace Sarah.Education.Shared.Dto
{
    public interface IKeyValue
    {
        string Name { get; set; }
        object Value { get; set; }

        string ToDisplayValue();
    }
}
