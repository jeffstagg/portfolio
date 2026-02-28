using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace PortfolioApi.Models;

public class Experience
{
    [JsonProperty("id")]
    [JsonPropertyName("id")]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [JsonProperty("type")]
    [JsonPropertyName("type")]
    public string Type { get; set; } = "experience";

    [JsonProperty("title")]
    [JsonPropertyName("title")]
    public string Title { get; set; } = "";

    [JsonProperty("company")]
    [JsonPropertyName("company")]
    public string Company { get; set; } = "";

    [JsonProperty("period")]
    [JsonPropertyName("period")]
    public string Period { get; set; } = "";

    [JsonProperty("employmentType")]
    [JsonPropertyName("employmentType")]
    public string EmploymentType { get; set; } = "";

    [JsonProperty("location")]
    [JsonPropertyName("location")]
    public string Location { get; set; } = "";

    [JsonProperty("highlights")]
    [JsonPropertyName("highlights")]
    public List<string> Highlights { get; set; } = new();

    [JsonProperty("projects")]
    [JsonPropertyName("projects")]
    public List<Project> Projects { get; set; } = new();
}
