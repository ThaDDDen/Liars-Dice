namespace Core.Models.App;

public class GameProperties
{
    public bool GameHost { get; set; }
    public List<int> Dice { get; set; } = new();
    public bool HasRolled { get; set; }
    public bool IsOut { get; set; }
}