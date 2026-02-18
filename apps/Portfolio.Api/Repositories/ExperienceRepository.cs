using PortfolioApi.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace PortfolioApi.Repositories;

/// <summary>
/// Cosmos DB implementation of the Experience repository
/// </summary>
public class ExperienceRepository : IExperienceRepository
{
    private readonly Container _container;
    private readonly ILogger<ExperienceRepository> _logger;

    public ExperienceRepository(
        CosmosClient cosmosClient,
        ILogger<ExperienceRepository> logger)
    {
        _container = cosmosClient.GetContainer("ExperienceDb", "Experiences");
        _logger = logger;
    }

    public async Task<IEnumerable<Experience>> GetAllExperiencesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Repository: Retrieving all experiences from Cosmos DB");

            var query = new QueryDefinition("SELECT * FROM c WHERE c.type = @type")
                .WithParameter("@type", "experience");

            var iterator = _container.GetItemQueryIterator<Experience>(query);
            var experiences = new List<Experience>();

            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync(cancellationToken);
                experiences.AddRange(response);
            }

            _logger.LogInformation("Repository: Retrieved {Count} experiences from Cosmos DB", experiences.Count);
            return experiences;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            _logger.LogWarning("Repository: No experiences found in Cosmos DB");
            return Enumerable.Empty<Experience>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Repository: Error retrieving all experiences from Cosmos DB");
            throw;
        }
    }

    public async Task<Experience?> GetExperienceByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Repository: Retrieving experience with ID: {ExperienceId} from Cosmos DB", id);

            var response = await _container.ReadItemAsync<Experience>(
                id,
                new PartitionKey(id),
                cancellationToken: cancellationToken);

            _logger.LogInformation("Repository: Successfully retrieved experience: {ExperienceId} from Cosmos DB", id);
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            _logger.LogWarning("Repository: Experience not found in Cosmos DB: {ExperienceId}", id);
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Repository: Error retrieving experience: {ExperienceId} from Cosmos DB", id);
            throw;
        }
    }
}
