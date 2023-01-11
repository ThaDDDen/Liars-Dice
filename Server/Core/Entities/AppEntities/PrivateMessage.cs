namespace Core.Entities.AppEntities;

public class PrivateMessage: BaseEntity
{
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public DateTime Time { get; set; }
    public string Message { get; set; }
}