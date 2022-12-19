namespace API.Hubs.HubModels;

    public class UserMessage
    {
        public HubUser User { get; set; }
        public string Message {get; set;}
        public string Time { get; set; }
    }
