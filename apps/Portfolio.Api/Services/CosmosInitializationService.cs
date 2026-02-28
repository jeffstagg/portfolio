using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace PortfolioApi.Services;

public class CosmosInitializationService : BackgroundService
{
    private readonly CosmosClient _cosmosClient;
    private readonly ILogger<CosmosInitializationService> _logger;

    public CosmosInitializationService(CosmosClient cosmosClient, ILogger<CosmosInitializationService> logger)
    {
        _cosmosClient = cosmosClient;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var maxRetries = 30;
        var delay = TimeSpan.FromSeconds(5);

        for (int attempt = 1; attempt <= maxRetries; attempt++)
        {
            if (stoppingToken.IsCancellationRequested) return;

            try
            {
                _logger.LogInformation("Cosmos connection attempt {Attempt}/{MaxRetries}...", attempt, maxRetries);
                var db = await _cosmosClient.CreateDatabaseIfNotExistsAsync("portfolio-db", cancellationToken: stoppingToken);
                await db.Database.CreateContainerIfNotExistsAsync("content", "/type", cancellationToken: stoppingToken);
                _logger.LogInformation("Cosmos DB initialized successfully.");
                return;
            }
            catch (Exception ex) when (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogWarning("Cosmos not ready (attempt {Attempt}): {Message}", attempt, ex.Message);
                if (attempt == maxRetries)
                {
                    _logger.LogError("Max retries reached. Cosmos DB initialization failed.");
                    return;
                }
                await Task.Delay(delay, stoppingToken);
            }
        }
    }
}
