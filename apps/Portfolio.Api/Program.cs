using Microsoft.Azure.Functions.Worker.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Azure.Cosmos;
using System.Net.Http;
using PortfolioApi.Services;
using PortfolioApi.Repositories;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices((context, services) =>
    {
        var config = context.Configuration;

        var endpoint = config["Cosmos__Endpoint"];
        var key = config["Cosmos__Key"];

        if (string.IsNullOrEmpty(endpoint) || string.IsNullOrEmpty(key))
            throw new InvalidOperationException("Cosmos__Endpoint or Cosmos__Key not set!");

        CosmosClientOptions clientOptions = new()
        {
            HttpClientFactory = () => new HttpClient(new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            }),
            ConnectionMode = ConnectionMode.Gateway
        };
        
        var cosmosClient = new CosmosClient(endpoint, key, clientOptions);

        Console.WriteLine("Creating/getting database 'portfolio-db'...");
        var dbResponse = cosmosClient.CreateDatabaseIfNotExistsAsync("portfolio-db").GetAwaiter().GetResult();
        var database = dbResponse.Database;

        Console.WriteLine("Creating/getting container 'content'...");
        var containerResponse = database.CreateContainerIfNotExistsAsync(
            id: "content",
            partitionKeyPath: "/type"
        ).GetAwaiter().GetResult();

        var container = containerResponse.Container;
        Console.WriteLine("Successfully connected to Cosmos DB!");

        services.AddSingleton(cosmosClient);
        services.AddSingleton(container);

        services.AddScoped<IExperienceService, ExperienceService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IExperienceRepository, ExperienceRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
    })
    .Build();

host.Run();
