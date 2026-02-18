using System.Net;
using PortfolioApi.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using PortfolioApi.Models;
using Microsoft.Azure.Cosmos;

namespace PortfolioApi.Functions;

/// <summary>
/// Azure Function for retrieving all experiences
/// </summary>
public class GetAllExperiences
{
    private readonly IExperienceService _experienceService;
    private readonly ILogger<GetAllExperiences> _logger;
    private readonly JsonSerializerOptions _jsonOptions;
    private readonly Container _container;

    public GetAllExperiences(
        IExperienceService experienceService,
        ILogger<GetAllExperiences> logger,
        Container container)
    {
        _experienceService = experienceService;
        _logger = logger;
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
        _container = container ?? throw new ArgumentNullException(nameof(container));
    }

    [Function("GetExperiences")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "experiences")]
        HttpRequestData req)
    {
        var query = _container.GetItemQueryIterator<Experience>("SELECT * FROM c WHERE c.type = 'experience'");
        var results = new List<Experience>();

        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            results.AddRange(response);
        }

        var res = req.CreateResponse(HttpStatusCode.OK);
        await res.WriteAsJsonAsync(results);
        return res;
    }

}
