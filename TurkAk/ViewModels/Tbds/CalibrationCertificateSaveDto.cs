namespace TurkAk.ViewModels.Tbds;

public class CalibrationCertificateSaveDto
{
    public Guid CustomerId { get; set; }
    public string DeviceSerialNumber { get; set; } = string.Empty;
    public DateTime CalibrationDate { get; set; }
    public Guid ReferenceDeviceId { get; set; }
    public Guid DeviceTypeId { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
}
