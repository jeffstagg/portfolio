using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Cosmos;
using System.Net;
using PortfolioApi.Models;

public class CreateProject
{
    private readonly Container _container;

    public CreateProject(Container container)
    {
        _container = container;
    }

    [Function("CreateProject")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "experiences/{experienceId}/projects")]
        HttpRequestData req,
        string experienceId)
    {
        var experience = await _container.ReadItemAsync<Experience>(
            experienceId, new PartitionKey("experience"));

        var project = await req.ReadFromJsonAsync<Project>();
        project!.Id ??= Guid.NewGuid().ToString();

        experience.Resource.Projects.Add(project);

        await _container.ReplaceItemAsync(
            experience.Resource, experienceId, new PartitionKey("experience"));

        var res = req.CreateResponse(HttpStatusCode.Created);
        await res.WriteAsJsonAsync(project);
        return res;
    }
}
