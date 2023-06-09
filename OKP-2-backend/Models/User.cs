namespace backend.Models;

public partial class User
{
    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = "user"!;

    public virtual ICollection<Favorite> Favorites { get; } = new List<Favorite>();
}
