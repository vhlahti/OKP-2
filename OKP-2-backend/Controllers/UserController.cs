using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

using BCrypt.Net;

[Authorize]
[Route("api/[Controller]")]
[Route("api/[Controller]/[action]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly PostgresContext _context;

    public UserController(PostgresContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("")]
    public IActionResult GetUserData()
    {
        /* var query = this._context.Users */
        /*     .Where(user => user.Name == login.Name) */
        /*     .Select(user => new { user.Name, user.Password, user.Role }) */
        /*     .FirstOrDefault(); */
        /*  */
        /* return Ok(new { status = "Success", jwt = token }); */
        return Ok(new { status = "Success" });
    }
}
