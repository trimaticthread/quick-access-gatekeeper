using System;
using System.Collections.Generic;

namespace TurkAk.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string EmployeeNameSurname { get; set; } = null!;

    public string EmployeeUserName { get; set; } = null!;

    public string EmployeePassword { get; set; } = null!;

    public string EmployeeRole { get; set; } = null!;

    public bool EmployeeStatus { get; set; }

    public virtual ICollection<CustomersCertificate> CustomersCertificates { get; set; } = new List<CustomersCertificate>();
}
