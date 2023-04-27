using System.Web;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Clients;

namespace backend.Controllers;

[Route("api")]
[ApiController]
public class HelsinkiController : Controller
{
    private readonly IHelsinkiClient _helsinkiClient;

    public HelsinkiController(IHelsinkiClient helsinkiClient)
    {
        _helsinkiClient = helsinkiClient;
    }

    [HttpGet]
    [Route("")]
    [Route("/api")]
    public IActionResult Default()
    {
        return Ok();
    }

    [HttpGet("places")]
    public IActionResult Places([FromQuery] HelsinkiFilters filters)
    {
        var address = "v2/places/";
        var data = _helsinkiClient.Get(UriBuilder(filters, address));
        return Ok(new { Data = data });
    }

    [HttpGet("place/{id}")]
    public IActionResult Place([FromQuery] HelsinkiFilters filters, int id)
    {
        var address = $"v2/place/{id}";
        var data = _helsinkiClient.Get(UriBuilder(filters, address));
        return Ok(new { Data = data });
    }

    [HttpGet("activities")]
    public IActionResult Activities([FromQuery] HelsinkiFilters filters)
    {
        var address = "v2/activities";
        var data = _helsinkiClient.Get(UriBuilder(filters, address));
        return Ok(new { Data = data });
    }

    [HttpGet("activity/{id}")]
    public IActionResult Activity([FromQuery] HelsinkiFilters filters, int id)
    {
        var address = $"v2/activity/{id}";
        var data = _helsinkiClient.Get(UriBuilder(filters, address));
        return Ok(new { Data = data });
    }

    [HttpGet("events")]
    public IActionResult Events([FromQuery] HelsinkiFilters filters)
    {
        var address = "v1/events/";
        var data = _helsinkiClient.Get(UriBuilder(filters, address));
        Console.WriteLine(UriBuilder(filters, address));
        return Ok(new { Data = data });
    }

    [HttpGet("event/{id}")]
    public IActionResult Event([FromQuery] HelsinkiFilters filters, int id)
    {
        var address = $"v1/event/{id}";
        var data = _helsinkiClient.Get(UriBuilder(filters, address));
        return Ok(new { Data = data });
    }

    private string UriBuilder(HelsinkiFilters filters, string address)
    {
        // Append filters as query string parameters
        var queryParams = new List<string>();
        string url = address;

        if (!string.IsNullOrEmpty(filters.limit)) queryParams.Add($"limit={HttpUtility.UrlEncode(filters.limit)}");
        if (!string.IsNullOrEmpty(filters.start)) queryParams.Add($"start={HttpUtility.UrlEncode(filters.start)}");
        if (!string.IsNullOrEmpty(filters.tags_search)) queryParams.Add($"tags_search={HttpUtility.UrlEncode(filters.tags_search)}");
        if (!string.IsNullOrEmpty(filters.tags_filter)) queryParams.Add($"tags_filter={HttpUtility.UrlEncode(filters.tags_filter)}");
        if (!string.IsNullOrEmpty(filters.distance_filter)) queryParams.Add($"distance_filter={HttpUtility.UrlEncode(filters.distance_filter)}");
        if (!string.IsNullOrEmpty(filters.language_filter)) queryParams.Add($"language_filter={HttpUtility.UrlEncode(filters.language_filter)}");

        if (queryParams.Any()) {
            string queryString = string.Join("&", queryParams);
            url += "?" + queryString;
        }

        return url;
    }
}
