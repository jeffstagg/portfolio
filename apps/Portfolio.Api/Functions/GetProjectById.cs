// using System.Net;
// using PortfolioApi.Services;
// using Microsoft.Azure.Functions.Worker;
// using Microsoft.Azure.Functions.Worker.Http;
// using Microsoft.Extensions.Logging;
// using System.Text.Json;

// namespace PortfolioApi.Functions;

// /// <summary>
// /// Azure Function for retrieving a single project by ID
// /// </summary>
// public class GetProjectById
// {
//     private readonly IProjectService _projectService;
//     private readonly ILogger<GetProjectById> _logger;
//     private readonly JsonSerializerOptions _jsonOptions;

//     public GetProjectById(
//         IProjectService projectService,
//         ILogger<GetProjectById> logger)
//     {
//         _projectService = projectService;
//         _logger = logger;
//         _jsonOptions = new JsonSerializerOptions
//         {
//             PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
//             WriteIndented = true
//         };
//     }

//     [Function("GetProjectById")]
//     public async Task<HttpResponseData> Run(
//         [HttpTrigger(AuthorizationLevel.Function, "get", Route = "projects/{id}")] HttpRequestData req,
//         string id,
//         CancellationToken cancellationToken)
//     {
//         _logger.LogInformation("Function: Processing GetProjectById request for ID: {ProjectId}", id);

//         try
//         {
//             if (string.IsNullOrWhiteSpace(id))
//             {
//                 return await CreateErrorResponse(req, HttpStatusCode.BadRequest, 
//                     "Project ID is required");
//             }

//             var project = await _projectService.GetProjectByIdAsync(id, cancellationToken);

//             if (project == null)
//             {
//                 return await CreateErrorResponse(req, HttpStatusCode.NotFound, 
//                     $"Project with ID '{id}' not found");
//             }

//             var response = req.CreateResponse(HttpStatusCode.OK);
//             response.Headers.Add("Content-Type", "application/json");
//             AddCorsHeaders(response);
            
//             await response.WriteStringAsync(
//                 JsonSerializer.Serialize(project, _jsonOptions), 
//                 cancellationToken);

//             _logger.LogInformation("Function: Successfully processed GetProjectById request for ID: {ProjectId}", id);
//             return response;
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Function: Error processing GetProjectById request for ID: {ProjectId}", id);
//             return await CreateErrorResponse(req, HttpStatusCode.InternalServerError, 
//                 "An error occurred while retrieving the project");
//         }
//     }

//     [Function("GetProjectByIdOptions")]
//     public HttpResponseData HandleOptions(
//         [HttpTrigger(AuthorizationLevel.Anonymous, "options", Route = "projects/{id}")] HttpRequestData req)
//     {
//         var response = req.CreateResponse(HttpStatusCode.OK);
//         AddCorsHeaders(response);
//         return response;
//     }

//     private static void AddCorsHeaders(HttpResponseData response)
//     {
//         response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:3000");
//         response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//         response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
//         response.Headers.Add("Access-Control-Max-Age", "86400");
//     }

//     private async Task<HttpResponseData> CreateErrorResponse(
//         HttpRequestData req, 
//         HttpStatusCode statusCode, 
//         string message)
//     {
//         var response = req.CreateResponse(statusCode);
//         response.Headers.Add("Content-Type", "application/json");
//         AddCorsHeaders(response);

//         var errorObject = new { error = message, statusCode = (int)statusCode };
//         await response.WriteStringAsync(
//             JsonSerializer.Serialize(errorObject, _jsonOptions));

//         return response;
//     }
// }
