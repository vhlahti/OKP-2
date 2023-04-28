using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Net.Http.Headers;

namespace backend.Controllers;

[Authorize]
[Route("api")]
[ApiController]
public class FavoriteController : ControllerBase
{
    private readonly PostgresContext _context;
    private readonly IJwtProvider _jwt;

    public FavoriteController(PostgresContext context, IJwtProvider jwt)
    {
        _context = context;
        _jwt = jwt;
    }

    [HttpPost("favorites")]
    public IActionResult GetFavorites()
    {
        string token;
        try
        {
            token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
        }
        catch
        {
            return BadRequest("Failed to parse Authorization header");
        }

        // Name id is somehow automatically derived from
        // ClaimTypes.NameIdentifier which we use in our JWT service
        var username = _jwt.GetClaim(token, "nameid");

        var query = this._context.Favorites
            .Where(favorite => favorite.User == username)
            .Select(favorite => new { favorite.User, favorite.Id, favorite.Type })
            .ToList();

        return Ok(new { status = "Success", favorites = query });
    }

    [HttpPost("favorite")]
    public IActionResult SaveFavorite([FromForm] FavoriteRequest request)
    {
        string token;
        try
        {
            token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
        }
        catch
        {
            return BadRequest("Failed to parse Authorization header");
        }

        // Name id is somehow automatically derived from
        // ClaimTypes.NameIdentifier which we use in our JWT service
        request.User = _jwt.GetClaim(token, "nameid");

        // Construct full favorite object from request
        Favorite favorite = new Favorite { User = request.User, Type = request.Type, Id = request.Id };

        /* try */
        /* { */
            this._context.Favorites.Add(favorite);
            this._context.SaveChanges();
        /* } */
        /* catch */
        /* { */
        /*     return BadRequest("Internal server error"); */
        /* } */

        return Ok(new { status = "Success" });
    }
}
