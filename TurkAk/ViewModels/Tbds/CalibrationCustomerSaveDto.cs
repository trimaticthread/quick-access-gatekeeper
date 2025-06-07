namespace TurkAk.ViewModels.Tbds;

public class CalibrationCustomerSaveDto
{
    public string Title { get; set; } = "";
    public string CountryId { get; set; } = "";
    public string CityId { get; set; } = "";
    public int AccountType { get; set; }
    public string TaxNumber { get; set; } = "";
    public string Email { get; set; } = "";
    public string Website { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public string Address { get; set; } = "";
    public List<string> Files { get; set; } = [];
}
