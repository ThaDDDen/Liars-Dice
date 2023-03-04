
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase 
{
    private readonly IAppDataService _appDataService;

    public StatisticsController(IAppDataService appDataService)
    {
        _appDataService = appDataService;
    }

    [HttpGet]
    [Route("GetStatisticsByProfileId/{id:Guid}")]
    public async Task<IActionResult> GetStatistics(Guid id)
    {
        Console.WriteLine("Kommer hit iaf");
        var statistics = await _appDataService.GetStatistics(id.ToString());
        return Ok(statistics);
    }

}