using backend.Clients;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
string[] origins = { "http://localhost:4200", "https://localhost:4200" };
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policyBuilder => policyBuilder
        .WithOrigins(origins)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});
builder.Services.AddControllers();
builder.Services.AddHttpClient<IHelsinkiClient, HelsinkiClient>(client =>
    client.BaseAddress = new Uri("https://open-api.myhelsinki.fi/"));
builder.Services.AddDbContext<PostgresContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresContext")));

// Configure the HTTP request pipeline.
var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseRouting();
app.MapControllers();

app.Run();
