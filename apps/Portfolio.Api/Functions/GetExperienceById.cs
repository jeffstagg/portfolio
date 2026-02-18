// using System.Net;
// using PortfolioApi.Services;
// using Microsoft.Azure.Functions.Worker;
// using Microsoft.Azure.Functions.Worker.Http;
// using Microsoft.Extensions.Logging;
// using System.Text.Json;

// namespace PortfolioApi.Functions;

// /// <summary>
// /// Azure Function for retrieving a single experience by ID
// /// </summary>
// public class GetExperienceById
// {
//     private readonly IExperienceService _experienceService;
//     private readonly ILogger<GetExperienceById> _logger;
//     private readonly JsonSerializerOptions _jsonOptions;

//     public GetExperienceById(
//         IExperienceService experienceService,
//         ILogger<GetExperienceById> logger)
//     {
//         _experienceService = experienceService;
//         _logger = logger;
//         _jsonOptions = new JsonSerializerOptions
//         {
//             PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
//             WriteIndented = true
//         };
//     }

//     [Function("GetExperienceById")]
//     public async Task<HttpResponseData> Run(
//         [HttpTrigger(AuthorizationLevel.Function, "get", Route = "experiences/{id}")] HttpRequestData req,
//         string id,
//         CancellationToken cancellationToken)
//     {
//         _logger.LogInformation("Function: Processing GetExperienceById request for ID: {ExperienceId}", id);

//         try
//         {
//             if (string.IsNullOrWhiteSpace(id))
//             {
//                 return await CreateErrorResponse(req, HttpStatusCode.BadRequest, 
//                     "Experience ID is required");
//             }

//             var experience = await _experienceService.GetExperienceByIdAsync(id, cancellationToken);

//             if (experience == null)
//             {
//                 return await CreateErrorResponse(req, HttpStatusCode.NotFound, 
//                     $"Experience with ID '{id}' not found");
//             }

//             var response = req.CreateResponse(HttpStatusCode.OK);
//             response.Headers.Add("Content-Type", "application/json");
//             AddCorsHeaders(response);
            
//             await response.WriteStringAsync(
//                 JsonSerializer.Serialize(experience, _jsonOptions), 
//                 cancellationToken);

//             _logger.LogInformation("Function: Successfully processed GetExperienceById request for ID: {ExperienceId}", id);
//             return response;
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Function: Error processing GetExperienceById request for ID: {ExperienceId}", id);
//             return await CreateErrorResponse(req, HttpStatusCode.InternalServerError, 
//                 "An error occurred while retrieving the experience");
//         }
//     }

//     [Function("GetExperienceByIdOptions")]
//     public HttpResponseData HandleOptions(
//         [HttpTrigger(AuthorizationLevel.Anonymous, "options", Route = "experiences/{id}")] HttpRequestData req)
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
