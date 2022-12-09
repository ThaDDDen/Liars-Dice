dotnet ef migrations add InitialCreate --context AuthDbContext -o Auth/Migrations

dotnet ef database update
