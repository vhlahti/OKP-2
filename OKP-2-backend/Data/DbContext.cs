using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public partial class DatabaseContext : DbContext
{
    public string dbHost { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
        this.dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
    }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(@"Host=" + dbHost + ":5432;Username=postgres;Password=postgres;Database=postgres");

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
