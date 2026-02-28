using Microsoft.Azure.Functions.Worker.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Azure.Cosmos;
using System.Net.Http;
using PortfolioApi.Services;
using PortfolioApi.Repositories;
using Microsoft.Extensions.Configuration;

var configBuilder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: false)
    .AddEnvironmentVariables();

var configuration = configBuilder.Build();

var cosmosEndpoint = configuration["Values:CosmoseEndpoint"];
var cosmosKey      = configuration["Values:CosmosKey"];

CosmosClientOptions clientOptions = new()
{
    HttpClientFactory = () => new HttpClient(new CosmosEmulatorRedirectHandler("cosmos")),
    ConnectionMode = ConnectionMode.Gateway
};

var cosmosClient = new CosmosClient(
    accountEndpoint: cosmosEndpoint,
    authKeyOrResourceToken: cosmosKey,
    clientOptions: clientOptions
);

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureAppConfiguration((context, config) =>
    {
        config.AddJsonFile("local.settings.json", optional: true, reloadOnChange: false);
        config.AddEnvironmentVariables();
    })
    .ConfigureServices((context, services) =>
    {
        services.AddSingleton(cosmosClient);
        services.AddSingleton(sp =>
            sp.GetRequiredService<CosmosClient>().GetDatabase("portfolio-db").GetContainer("content"));

        services.AddHostedService<CosmosInitializationService>();

        services.AddScoped<IExperienceService, ExperienceService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IExperienceRepository, ExperienceRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
    })
    .Build();

host.Run();

// The Cosmos emulator advertises 127.0.0.1 in its own account metadata, so the SDK
// resolves subsequent requests back to localhost inside this container. This handler
// rewrites those URIs to the actual emulator hostname before they go out.
class CosmosEmulatorRedirectHandler(string emulatorHost) : DelegatingHandler(
    new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback =
            HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
    })
{
    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (request.RequestUri is { Host: "127.0.0.1" or "localhost" })
            request.RequestUri = new UriBuilder(request.RequestUri) { Host = emulatorHost }.Uri;

        return base.SendAsync(request, cancellationToken);
    }
}
