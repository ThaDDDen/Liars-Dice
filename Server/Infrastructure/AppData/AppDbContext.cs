
using Microsoft.EntityFrameworkCore;
using Core.Entities.AppEntities;

namespace Infrastructure.AppData;

public class AppDbContext : DbContext
{
    public DbSet<FriendRelation> Friends { get; set; }
    public DbSet<PrivateMessage> PrivateMessages { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
}