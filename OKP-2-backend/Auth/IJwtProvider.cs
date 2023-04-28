using System.Security.Claims;

public interface IJwtProvider
{
    public string GenerateToken(string username, string role);
    public string GetClaim(string token, string claimType);
    public Claim[] GetClaims(string token);
}
