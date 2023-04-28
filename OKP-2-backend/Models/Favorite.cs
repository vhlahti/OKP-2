namespace backend.Models;

public partial class Favorite
{
    public string User { get; set; } = null!;

    public string Id { get; set; } = null!;

    public string Type { get; set; } = null!;

    public virtual User UserNavigation { get; set; } = null!;
}
