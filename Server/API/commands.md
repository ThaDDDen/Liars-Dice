dotnet ef migrations add InitialCreate --context AuthDbContext -o Auth/Migrations

dotnet ef database update



dotnet ef migrations add InitialAuthDbCreate --context AuthDbContext -p ../Infrastructure/Infrastructure.csproj -s Api.csproj -o Identity/Migrations
dotnet ef migrations add InitialAppDbCreate --context AppDbContext -p ../Infrastructure/Infrastructure.csproj -s Api.csproj -o AppData/Migrations