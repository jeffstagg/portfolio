using PortfolioApi.Models;

namespace PortfolioApi.Repositories;

/// <summary>
/// Repository interface for Project entities
/// </summary>
public interface IProjectRepository
{
    /// <summary>
    /// Retrieves a single project by ID from the database
    /// </summary>
    Task<Project?> GetProjectByIdAsync(string id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves all projects for a specific experience from the database
    /// </summary>
    Task<IEnumerable<Project>> GetProjectsByExperienceIdAsync(string experienceId, CancellationToken cancellationToken = default);
}
