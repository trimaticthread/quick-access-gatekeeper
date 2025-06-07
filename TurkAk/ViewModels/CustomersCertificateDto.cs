// ViewModels/CustomersCertificateDto.cs
namespace TurkAk.ViewModels
{
    public class CustomersCertificateDto
    {
        public int CertificateId { get; set; }
        public int Customer { get; set; }
        public int DeviceType { get; set; }
        public string DeviceSerialNo { get; set; } = null!;
        public int ReferenceCalibrator { get; set; }
        public int ReferenceCalibratorSerialNo { get; set; }
        public int CalibratorEmployee { get; set; }
        public string CalibratorLocation { get; set; } = null!;
        public DateTime CalibratorDate { get; set; }
        public DateTime FirstAirDate { get; set; }
        public DateTime RevisionDate { get; set; }
        public string? RevisionNote { get; set; }

        // Navigation properties için ek bilgiler
        public string? CustomerName { get; set; }
        public string? DeviceTypeName { get; set; }
        public string? EmployeeName { get; set; }
        public string? ReferenceDeviceName { get; set; }
    }
}
