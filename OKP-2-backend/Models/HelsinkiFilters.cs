namespace backend.Models;

public class HelsinkiFilters
{
    public string? tags_search { get; set; }
    public string? tags_filter { get; set; }
    public string? distance_filter { get; set; }
    public string? language_filter { get; set; }
    public string? limit { get; set; }
    public string? start { get; set; }
}
