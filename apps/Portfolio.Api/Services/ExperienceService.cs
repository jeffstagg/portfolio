using PortfolioApi.Models;
using PortfolioApi.Repositories;
using Microsoft.Extensions.Logging;

namespace PortfolioApi.Services;

/// <summary>
/// Service implementation for Experience operations
/// </summary>
public class ExperienceService : IExperienceService
{
    private readonly IExperienceRepository _experienceRepository;
    private readonly IProjectService _projectService;
    private readonly ILogger<ExperienceService> _logger;

    public ExperienceService(
        IExperienceRepository experienceRepository,
        IProjectService projectService,
        ILogger<ExperienceService> logger)
    {
        _experienceRepository = experienceRepository;
        _projectService = projectService;
        _logger = logger;
    }

    public async Task<IEnumerable<Experience>> GetAllExperiencesAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Service: Retrieving all experiences");

        var experiences = await _experienceRepository.GetAllExperiencesAsync(cancellationToken);

        // Enrich each experience with its projects
        var experiencesList = experiences.ToList();
        foreach (var experience in experiencesList)
        {
            experience.Projects = (await _projectService
                .GetProjectsByExperienceIdAsync(experience.Id, cancellationToken))
                .ToList();
        }

        _logger.LogInformation("Service: Retrieved {Count} experiences", experiencesList.Count);
        return experiencesList;
    }

    public async Task<Experience?> GetExperienceByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Service: Retrieving experience with ID: {ExperienceId}", id);

        var experience = await _experienceRepository.GetExperienceByIdAsync(id, cancellationToken);

        if (experience == null)
        {
            _logger.LogWarning("Service: Experience not found: {ExperienceId}", id);
            return null;
        }

        // Enrich with projects
        experience.Projects = (await _projectService
            .GetProjectsByExperienceIdAsync(experience.Id, cancellationToken))
            .ToList();

        _logger.LogInformation("Service: Successfully retrieved experience: {ExperienceId}", id);
        return experience;
    }
}
