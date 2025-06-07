namespace TurkAk.ViewModels.Tbds;

public class CalibrationCertificateDetailDto
{
    public string CustomerTitle { get; set; } = string.Empty;
    public string DeviceType { get; set; } = string.Empty;
    public string DeviceSerialNo { get; set; } = string.Empty;
    public string ReferenceDevice { get; set; } = string.Empty;
    public string ReferenceSerialNo { get; set; } = string.Empty;
    public string CalibratorEmployee { get; set; } = string.Empty;
    public string CalibratorLocation { get; set; } = string.Empty;
    public DateTime CalibratorDate { get; set; }
    public DateTime FirstAirDate { get; set; }
    public DateTime RevisionDate { get; set; }
    public string RevisionNote { get; set; } = string.Empty;
}
