using PortfolioApi.Models;

namespace PortfolioApi.Services;

/// <summary>
/// Service interface for Project operations
/// </summary>
public interface IProjectService
{
    /// <summary>
    /// Retrieves a single project by ID
    /// </summary>
    Task<Project?> GetProjectByIdAsync(string id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves all projects for a specific experience
    /// </summary>
    Task<IEnumerable<Project>> GetProjectsByExperienceIdAsync(string experienceId, CancellationToken cancellationToken = default);
}
