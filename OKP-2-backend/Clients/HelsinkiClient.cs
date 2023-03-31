namespace backend.Clients;

// Source for this client pattern thing
// https://www.youtube.com/watch?v=Z6Y2adsMnAA
public class HelsinkiClient : IHelsinkiClient
{
    private readonly HttpClient _httpClient;

    public HelsinkiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> Get(string address)
    {
        return await _httpClient.GetStringAsync(address);
    }
}

public interface IHelsinkiClient
{
    Task<string> Get(string address);
}