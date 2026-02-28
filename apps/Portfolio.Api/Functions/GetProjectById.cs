using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Cosmos;
using System.Net;
using PortfolioApi.Models;

public class GetProjectById
{
    private readonly Container _container;

    public GetProjectById(Container container)
    {
        _container = container;
    }

    [Function("GetProjectById")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "projects/{id}")]
        HttpRequestData req,
        string id)
    {
        var query = new QueryDefinition(
            "SELECT VALUE p FROM c JOIN p IN c.projects WHERE c.type = 'experience' AND p.id = @id")
            .WithParameter("@id", id);

        var iterator = _container.GetItemQueryIterator<Project>(query);

        while (iterator.HasMoreResults)
        {
            var page = await iterator.ReadNextAsync();
            var project = page.FirstOrDefault();
            if (project != null)
            {
                var res = req.CreateResponse(HttpStatusCode.OK);
                await res.WriteAsJsonAsync(project);
                return res;
            }
        }

        return req.CreateResponse(HttpStatusCode.NotFound);
    }
}
