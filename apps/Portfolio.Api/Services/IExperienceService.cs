using PortfolioApi.Models;

namespace PortfolioApi.Services;

/// <summary>
/// Service interface for Experience operations
/// </summary>
public interface IExperienceService
{
    /// <summary>
    /// Retrieves all experiences with their associated projects
    /// </summary>
    Task<IEnumerable<Experience>> GetAllExperiencesAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves a single experience by ID with its associated projects
    /// </summary>
    Task<Experience?> GetExperienceByIdAsync(string id, CancellationToken cancellationToken = default);
}
