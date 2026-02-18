using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Cosmos;
using System.Net;
using PortfolioApi.Models;
using Microsoft.Azure.Cosmos;

public class CreateExperience
{
    private readonly Container _container;

    public CreateExperience(CosmosClient client)
    {
        _container = client
            .GetDatabase("portfolio-db")
            .GetContainer("content");
    }

    [Function("CreateExperience")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "experiences")]
        HttpRequestData req)
    {
        var exp = await req.ReadFromJsonAsync<Experience>();

        exp.Id ??= Guid.NewGuid().ToString();

        await _container.CreateItemAsync(exp, new PartitionKey(exp.Type));

        var res = req.CreateResponse(HttpStatusCode.Created);
        await res.WriteAsJsonAsync(exp);

        return res;
    }
}
