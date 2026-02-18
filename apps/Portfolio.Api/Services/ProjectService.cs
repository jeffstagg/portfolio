using PortfolioApi.Models;
using PortfolioApi.Repositories;
using Microsoft.Extensions.Logging;

namespace PortfolioApi.Services;

/// <summary>
/// Service implementation for Project operations
/// </summary>
public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly ILogger<ProjectService> _logger;

    public ProjectService(
        IProjectRepository projectRepository,
        ILogger<ProjectService> logger)
    {
        _projectRepository = projectRepository;
        _logger = logger;
    }

    public async Task<Project?> GetProjectByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Service: Retrieving project with ID: {ProjectId}", id);

        var project = await _projectRepository.GetProjectByIdAsync(id, cancellationToken);

        if (project == null)
        {
            _logger.LogWarning("Service: Project not found: {ProjectId}", id);
            return null;
        }

        _logger.LogInformation("Service: Successfully retrieved project: {ProjectId}", id);
        return project;
    }

    public async Task<IEnumerable<Project>> GetProjectsByExperienceIdAsync(string experienceId, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Service: Retrieving projects for experience: {ExperienceId}", experienceId);

        var projects = await _projectRepository.GetProjectsByExperienceIdAsync(experienceId, cancellationToken);

        var projectsList = projects.ToList();
        _logger.LogInformation("Service: Retrieved {Count} projects for experience: {ExperienceId}", 
            projectsList.Count, experienceId);

        return projectsList;
    }
}
