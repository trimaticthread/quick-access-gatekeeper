using System;
using System.Collections.Generic;

namespace TurkAk.Models;

public partial class CustomersCertificate
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

    public virtual Employee CalibratorEmployeeNavigation { get; set; } = null!;

    public virtual Customer CustomerNavigation { get; set; } = null!;

    public virtual NewDeviceType DeviceTypeNavigation { get; set; } = null!;

    public virtual ReferenceDeviceAdd ReferenceCalibratorNavigation { get; set; } = null!;
}
