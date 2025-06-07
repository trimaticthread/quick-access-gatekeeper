using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurkAk.Data;
using TurkAk.Models;
using TurkAk.ViewModels;

namespace TurkAk.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] EmployeeLoginDto loginDto)
    {
        var employee = await _context.Employee
            .FirstOrDefaultAsync(e =>
                e.EmployeeUserName == loginDto.EmployeeUserName &&
                e.EmployeeStatus);

        if (employee is null)
            return Unauthorized("Kullanıcı bulunamadı.");

        // Şifreyi hashlenmiş haliyle karşılaştır
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.EmployeePassword, employee.EmployeePassword);
        if (!isPasswordValid)
            return Unauthorized("Şifre hatalı.");

        // Token üretmiyoruz, sadece doğrulama + temel token mock
        var token = "authenticated-local-user";
        var tokenExpiry = DateTime.UtcNow.AddHours(8);

        var response = new EmployeeLoginResponseDto
        {
            Token = token,
            EmployeeId = employee.EmployeeId,
            EmployeeNameSurname = employee.EmployeeNameSurname,
            EmployeeRole = employee.EmployeeRole,
            EmployeeUserName = employee.EmployeeUserName,
            TokenExpiry = tokenExpiry.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
        };

        return Ok(response);
    }

    [HttpPost("verify-token")]
    public IActionResult VerifyToken()
    {
        // Şu anda her zaman geçerli
        return Ok(new { valid = true });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // Gerçek bir logout işlemi yapılmıyor, sadece bilgi veriyoruz
        return Ok(new { message = "Başarıyla çıkış yapıldı." });
    }
}
