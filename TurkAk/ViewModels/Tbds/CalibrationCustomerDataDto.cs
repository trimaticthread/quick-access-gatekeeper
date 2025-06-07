namespace TurkAk.ViewModels.Tbds;

public class CalibrationCustomerDataDto
{
    public List<CountryDto> Countries { get; set; } = [];
    public List<CityDto> Cities { get; set; } = [];
    public List<AccountTypeDto> DVAccountTypes { get; set; } = [];
    public List<FileDto> Files { get; set; } = [];
}
