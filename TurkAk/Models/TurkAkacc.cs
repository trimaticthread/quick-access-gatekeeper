using System;
using System.Collections.Generic;

namespace TurkAk.Models;

public partial class TurkAkacc
{
    public int TurkakAccId { get; set; }

    public string? TurkakAccUserName { get; set; }

    public string? TurkakAccPassword { get; set; }

    public string? Token { get; set; }

    public DateTime? TokenExpiry { get; set; }
}
