namespace TurkAk.ViewModels.Tbds;

public class CalibrationCertificateListItemDto
{
    public Guid ID { get; set; }
    public Guid CustomerID { get; set; }
    public string TBDSNumber { get; set; } = string.Empty;
    public string CertificationBodyDocumentNumber { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
}
