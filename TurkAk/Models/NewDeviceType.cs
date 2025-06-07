using System;
using System.Collections.Generic;

namespace TurkAk.Models;

public partial class NewDeviceType
{
    public int NewDeviceTypeId { get; set; }

    public string DeviceTypeName { get; set; } = null!;

    public string? DeviceTypeComment { get; set; }

    public int ReferenceCalibrator { get; set; }

    public virtual ICollection<CustomersCertificate> CustomersCertificates { get; set; } = [];
    public virtual ReferenceDeviceAdd? ReferenceCalibratorNavigation { get; set; }

}
