using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Cosmos;
using System.Net;
using PortfolioApi.Models;

public class GetExperienceById
{
    private readonly Container _container;

    public GetExperienceById(Container container)
    {
        _container = container;
    }

    [Function("GetExperienceById")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "experiences/{id}")]
        HttpRequestData req,
        string id)
    {
        try
        {
            var item = await _container.ReadItemAsync<Experience>(id, new PartitionKey("experience"));
            var res = req.CreateResponse(HttpStatusCode.OK);
            await res.WriteAsJsonAsync(item.Resource);
            return res;
        }
        catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        {
            return req.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}
