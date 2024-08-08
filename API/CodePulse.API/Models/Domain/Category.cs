namespace CodePulse.API.Models.Domain;
public class Category 
{
    public Guid Id { get; set; } 
    public string Name { get; set; } = string.Empty;
    public string UrlHandle { get; set; } = string.Empty;
}