// ViewModels/ReferenceDeviceAddDto.cs
namespace TurkAk.ViewModels
{
    public class ReferenceDeviceAddDto
    {
        public int ReferenceDeviceId { get; set; }
        public string ReferenceDeviceName { get; set; } = null!;
        public string SerialNo { get; set; } = null!;
        public string? Comment { get; set; }
        public string DeviceType { get; set; } = null!;
        public bool Status { get; set; }
        public DateTime LastCalibratorDate { get; set; }
        public DateTime NextCalibratorDate { get; set; }
    }
}
