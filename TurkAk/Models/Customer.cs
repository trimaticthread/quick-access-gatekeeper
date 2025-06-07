using System;
using System.Collections.Generic;

namespace TurkAk.Models;

public partial class Customer
{
    public int CustomersId { get; set; }

    public string TaxNumber { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string BrandInfo { get; set; } = null!;

    public string CustomersAddress { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Website { get; set; }

    public string Country { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Files { get; set; } = null!;

    public string AccountType { get; set; } = null!;

    public virtual ICollection<CustomersCertificate> CustomersCertificates { get; set; } = [];
}

