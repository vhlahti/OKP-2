using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

using BCrypt.Net;

[Route("api/[Controller]")]
[Route("api/[Controller]/[action]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly PostgresContext _context;
    private readonly IJwtProvider _jwt;

    public LoginController(PostgresContext context, IJwtProvider jwt)
    {
        _context = context;
        _jwt = jwt;
    }

    [HttpPost]
    [Route("")]
    public IActionResult Login([FromForm] AuthRequest login)
    {
        var errors = new List<string>();

        // Check if post request has correct parameters
        if (string.IsNullOrWhiteSpace(login.Name))
        {
            errors.Add("Name field cannot be empty");
        }
        if (string.IsNullOrWhiteSpace(login.Password))
        {
            errors.Add("Password field cannot be empty");
        }

        if (errors.Count > 0)
        {
            return BadRequest(new { status = "Error", errors = errors });
        }

        var query = this._context.Users
            .Where(user => user.Name == login.Name)
            .Select(user => new { user.Name, user.Password, user.Role })
            .FirstOrDefault();
        
        if (query == null || !BCrypt.EnhancedVerify(login.Password, query.Password))
        {
            errors.Add("Invalid credentials");
            return BadRequest(new { status = "Error", errors = errors });
        }

        // Generate JWT
        var token = _jwt.GenerateToken(login.Name!, query.Role);
        
        return Ok(new { status = "Success", jwt = token });
    }
}
