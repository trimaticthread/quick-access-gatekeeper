// ViewModels/CustomerDto.cs
namespace TurkAk.ViewModels
{
    public class CustomerDto
    {
        public int CustomersId { get; set; }
        public string TaxNumber { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string BrandInfo { get; set; } = null!;
        public string CustomersAddress { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Website { get; set; }
        public string Country { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Files { get; set; } = null!;
        public string AccountType { get; set; } = null!;
    }
}
