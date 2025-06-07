// ViewModels/TurkAkaccDto.cs
namespace TurkAk.ViewModels
{
    public class TurkAkaccDto
    {
        public int TurkakAccId { get; set; }
        public string TurkakAccUserName { get; set; } = null!;
        public string TurkakAccPassword { get; set; } = null!;
        public string Token { get; set; } = null!;
        public DateTime TokenExpiry { get; set; }
    }
}
