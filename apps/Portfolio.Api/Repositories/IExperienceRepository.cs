using PortfolioApi.Models;

namespace PortfolioApi.Repositories;

/// <summary>
/// Repository interface for Experience entities
/// </summary>
public interface IExperienceRepository
{
    /// <summary>
    /// Retrieves all experiences from the database
    /// </summary>
    Task<IEnumerable<Experience>> GetAllExperiencesAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves a single experience by ID from the database
    /// </summary>
    Task<Experience?> GetExperienceByIdAsync(string id, CancellationToken cancellationToken = default);
}
