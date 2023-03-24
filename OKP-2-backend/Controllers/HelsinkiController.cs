using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class HelsinkiController : Controller
{
    public HelsinkiController() { }

    [HttpGet]
    [Route("")]
    public IActionResult Default()
    {
        return Ok(new { Message = "Hello world, from default" });
    }

    [HttpGet]
    [Route("/api/place/{id}")]
    public IActionResult Place(int id)
    {
        return Ok(new { Message = "Hello world " + id });
    }


    [HttpGet]
    [Route("/api/places")]
    public IActionResult Places()
    {
        return Ok(new { Message = "Hello world" });
    }

    [HttpGet]
    [Route("/api/activity/{id}")]
    public IActionResult Activity(int id)
    {
        return Ok(new { Message = "Hello world " + id });
    }

    [HttpGet]
    [Route("/api/activities/")]
    public IActionResult Activities()
    {
        return Ok(new { Message = "Hello world" });
    }

    [HttpGet]
    [Route("/api/event/{id}")]
    public IActionResult Event(int id)
    {
        return Ok(new { Message = "Hello world " + id });
    }

    [HttpGet]
    [Route("/api/events/")]
    public IActionResult Events()
    {
        return Ok(new { Message = "Hello world" });
    }
}
