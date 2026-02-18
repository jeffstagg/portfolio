using System.Text.Json.Serialization;
using PortfolioApi.Models;

namespace PortfolioApi.Models;

/// <summary>
/// Represents an Experience entity in the system
/// </summary>
public class Experience
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Type { get; set; } = "experience";
    public string Title { get; set; } = "";
    public string Company { get; set; } = "";
    public string Period { get; set; } = "";
    public string EmploymentType { get; set; } = "";
    public string Location { get; set; } = "";
    public List<string> Highlights { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
}
