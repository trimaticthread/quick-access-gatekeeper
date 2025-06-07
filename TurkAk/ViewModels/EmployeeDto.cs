// ViewModels/EmployeeDto.cs
namespace TurkAk.ViewModels
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeNameSurname { get; set; } = null!;
        public string EmployeeUserName { get; set; } = null!;
        public string EmployeePassword { get; set; } = null!;
        public string EmployeeRole { get; set; } = null!;
        public bool EmployeeStatus { get; set; }
    }

    public class EmployeeLoginDto
    {
        public string EmployeeUserName { get; set; } = null!;
        public string EmployeePassword { get; set; } = null!;
    }

    public class EmployeeLoginResponseDto
    {
        public string Token { get; set; } = null!;
        public int EmployeeId { get; set; }
        public string EmployeeNameSurname { get; set; } = null!;
        public string EmployeeRole { get; set; } = null!;
        public string EmployeeUserName { get; set; } = null!;
        public string TokenExpiry { get; set; } = null!;
    }
}
