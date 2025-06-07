using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurkAk.Services;
using TurkAk.ViewModels;
using TurkAk.Data;

namespace TurkAk.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurkAkaccApiController(TurkAkaccService service, AppDbContext context) : ControllerBase
    {
        private readonly TurkAkaccService _service = service;
        private readonly AppDbContext _context = context;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TurkAkaccLoginDto dto)
        {
            var (success, message) = await _service.LoginAsync(dto);

            if (!success)
                return BadRequest(new { status = "error", message });

            return Ok(new { status = "success", message });
        }

        [HttpPost("verify-token")]
        public async Task<IActionResult> VerifyToken()
        {
            var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

            if (tokenData is null || string.IsNullOrEmpty(tokenData.Token))
                return Ok(new { valid = false, message = "Token kaydı bulunamadı." });

            if (tokenData.TokenExpiry < DateTime.Now)
                return Ok(new { valid = false, message = "Token süresi dolmuş." });

            return Ok(new { valid = true });
        }

        [HttpPost("clear-expired-token")]
        public async Task<IActionResult> ClearExpiredToken()
        {
            var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

            if (tokenData is null)
                return Ok(new { cleared = false, message = "Token zaten yok." });

            if (tokenData.TokenExpiry >= DateTime.Now)
                return Ok(new { cleared = false, message = "Token henüz geçerli, silinmedi." });

            _context.TurkAkaccs.Remove(tokenData);
            await _context.SaveChangesAsync();

            return Ok(new { cleared = true, message = "Süresi dolmuş token silindi." });
        }

        [HttpGet("token-status")]
        public async Task<IActionResult> TokenStatus()
        {
            var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

            if (tokenData is null || tokenData.TokenExpiry is null)
                return Ok(new { valid = false, expiresInMinutes = 0 });

            var expiresIn = tokenData.TokenExpiry.Value.Subtract(DateTime.Now);
            var minutesLeft = expiresIn.TotalMinutes;

            return Ok(new
            {
                valid = minutesLeft > 0,
                expiresInMinutes = Math.Max(0, Math.Round(minutesLeft, 2))
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

            if (tokenData is null)
                return Ok(new { status = "info", message = "Zaten giriş yapılmamış." });

            _context.TurkAkaccs.Remove(tokenData);
            await _context.SaveChangesAsync();

            return Ok(new { status = "success", message = "Çıkış yapıldı, token silindi." });
        }




    }
}
