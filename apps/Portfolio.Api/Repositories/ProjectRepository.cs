using PortfolioApi.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace PortfolioApi.Repositories;

/// <summary>
/// Cosmos DB implementation of the Project repository
/// </summary>
public class ProjectRepository : IProjectRepository
{
    private readonly Container _container;
    private readonly ILogger<ProjectRepository> _logger;

    public ProjectRepository(
        CosmosClient cosmosClient,
        ILogger<ProjectRepository> logger)
    {
        _container = cosmosClient.GetContainer("ExperienceDb", "Experiences");
        _logger = logger;
    }

    public async Task<Project?> GetProjectByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Repository: Retrieving project with ID: {ProjectId} from Cosmos DB", id);

            var response = await _container.ReadItemAsync<Project>(
                id,
                new PartitionKey(id),
                cancellationToken: cancellationToken);

            _logger.LogInformation("Repository: Successfully retrieved project: {ProjectId} from Cosmos DB", id);
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            _logger.LogWarning("Repository: Project not found in Cosmos DB: {ProjectId}", id);
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Repository: Error retrieving project: {ProjectId} from Cosmos DB", id);
            throw;
        }
    }

    public async Task<IEnumerable<Project>> GetProjectsByExperienceIdAsync(string experienceId, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Repository: Retrieving projects for experience: {ExperienceId} from Cosmos DB", experienceId);

            var query = new QueryDefinition(
                "SELECT * FROM c WHERE c.type = @type AND c.experienceId = @experienceId")
                .WithParameter("@type", "project")
                .WithParameter("@experienceId", experienceId);

            var iterator = _container.GetItemQueryIterator<Project>(query);
            var projects = new List<Project>();

            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync(cancellationToken);
                projects.AddRange(response);
            }

            _logger.LogInformation("Repository: Retrieved {Count} projects for experience: {ExperienceId} from Cosmos DB", 
                projects.Count, experienceId);
            return projects;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Repository: Error retrieving projects for experience: {ExperienceId} from Cosmos DB", experienceId);
            throw;
        }
    }
}
