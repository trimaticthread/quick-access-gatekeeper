// ViewModels/NewDeviceTypeDto.cs
namespace TurkAk.ViewModels
{
    public class NewDeviceTypeDto
    {
        public int NewDeviceTypeId { get; set; }
        public string DeviceTypeName { get; set; } = string.Empty;
        public string? DeviceTypeComment { get; set; }
        public int ReferenceCalibrator { get; set; }
        public string? ReferenceCalibratorName { get; set; }
    }
}
