public interface IJwtProvider
{
    string GenerateToken(string username, string role);
}
