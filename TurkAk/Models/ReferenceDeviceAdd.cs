using System;
using System.Collections.Generic;

namespace TurkAk.Models;

public partial class ReferenceDeviceAdd
{
    public int ReferenceDeviceId { get; set; }

    public string ReferenceDeviceName { get; set; } = null!;

    public string SerialNo { get; set; } = null!;

    public string? Comment { get; set; }

    public string DeviceType { get; set; } = null!;

    public bool Status { get; set; }

    public DateTime LastCalibratorDate { get; set; }

    public DateTime NextCalibratorDate { get; set; }

    public virtual ICollection<CustomersCertificate> CustomersCertificates { get; set; } = new List<CustomersCertificate>();

    public virtual ICollection<NewDeviceType> NewDeviceTypes { get; set; } = new List<NewDeviceType>();
}
