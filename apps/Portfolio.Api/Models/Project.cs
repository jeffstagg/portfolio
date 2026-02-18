using System.Text.Json.Serialization;

namespace PortfolioApi.Models;

/// <summary>
/// Represents a Project entity associated with an Experience
/// </summary>
public class Project
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Company { get; set; } = "";
    public string Timeline { get; set; } = "";
    public string Impact { get; set; } = "";
    public Markdown Markdown { get; set; } = new();
    public List<string> Technologies { get; set; } = new();
    public string Image { get; set; } = "";
}

public class Markdown
{
    public string Problem { get; set; } = "";
    public string Solution { get; set; } = "";
    public string Result { get; set; } = "";
}
