using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace PortfolioApi.Models;

public class Project
{
    [JsonProperty("id")]
    [JsonPropertyName("id")]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [JsonProperty("title")]
    [JsonPropertyName("title")]
    public string Title { get; set; } = "";

    [JsonProperty("company")]
    [JsonPropertyName("company")]
    public string Company { get; set; } = "";

    [JsonProperty("timeline")]
    [JsonPropertyName("timeline")]
    public string Timeline { get; set; } = "";

    [JsonProperty("problem")]
    [JsonPropertyName("problem")]
    public string Problem { get; set; } = "";

    [JsonProperty("solution")]
    [JsonPropertyName("solution")]
    public string Solution { get; set; } = "";

    [JsonProperty("impact")]
    [JsonPropertyName("impact")]
    public string Impact { get; set; } = "";

    [JsonProperty("technologies")]
    [JsonPropertyName("technologies")]
    public List<string> Technologies { get; set; } = new();

    [JsonProperty("image")]
    [JsonPropertyName("image")]
    public string Image { get; set; } = "";
}
