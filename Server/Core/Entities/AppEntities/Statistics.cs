using Core.Entities.AppEntities;

public class Statistics : BaseEntity
{
    public string UserId { get; set; }
    public int Ones { get; set; } = 0;
    public int Twoes { get; set; } = 0;
    public int Threes { get; set; } = 0;
    public int Fours { get; set; } = 0;
    public int Fives { get; set; } = 0;
    public int Sixes { get; set; } = 0;
    public int Straights { get; set; } = 0;
    public int GamesPlayed { get; set; } = 0;
    public int GamesWon { get; set; } = 0;
}