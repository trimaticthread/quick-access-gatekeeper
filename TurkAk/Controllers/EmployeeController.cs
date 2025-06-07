using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurkAk.Models;
using TurkAk.ViewModels;
using BCrypt.Net;
using TurkAk.Data;

namespace TurkAk.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _context.Employee
            .Select(e => new EmployeeDto
            {
                EmployeeId = e.EmployeeId,
                EmployeeNameSurname = e.EmployeeNameSurname,
                EmployeeUserName = e.EmployeeUserName,
                EmployeePassword = "", // Şifreyi döndürme
                EmployeeRole = e.EmployeeRole,
                EmployeeStatus = e.EmployeeStatus
            })
            .ToListAsync();

        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _context.Employee
            .Where(e => e.EmployeeId == id)
            .Select(e => new EmployeeDto
            {
                EmployeeId = e.EmployeeId,
                EmployeeNameSurname = e.EmployeeNameSurname,
                EmployeeUserName = e.EmployeeUserName,
                EmployeePassword = "", // Şifreyi döndürme
                EmployeeRole = e.EmployeeRole,
                EmployeeStatus = e.EmployeeStatus
            })
            .FirstOrDefaultAsync();

        return employee == null ? NotFound() : Ok(employee);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EmployeeDto dto)
    {
        var employee = new Employee
        {
            EmployeeNameSurname = dto.EmployeeNameSurname,
            EmployeeUserName = dto.EmployeeUserName,
            EmployeePassword = BCrypt.Net.BCrypt.HashPassword(dto.EmployeePassword), // 🔐
            EmployeeRole = dto.EmployeeRole,
            EmployeeStatus = dto.EmployeeStatus
        };

        _context.Employee.Add(employee);
        await _context.SaveChangesAsync();

        dto.EmployeeId = employee.EmployeeId;
        dto.EmployeePassword = "";
        return CreatedAtAction(nameof(GetById), new { id = dto.EmployeeId }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] EmployeeDto dto)
    {
        if (id != dto.EmployeeId)
            return BadRequest("ID uyuşmuyor.");

        var employee = await _context.Employee.FindAsync(id);
        if (employee == null)
            return NotFound();

        employee.EmployeeNameSurname = dto.EmployeeNameSurname;
        employee.EmployeeUserName = dto.EmployeeUserName;

        if (!string.IsNullOrEmpty(dto.EmployeePassword))
            employee.EmployeePassword = BCrypt.Net.BCrypt.HashPassword(dto.EmployeePassword); // 🔐

        employee.EmployeeRole = dto.EmployeeRole;
        employee.EmployeeStatus = dto.EmployeeStatus;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var employee = await _context.Employee.FindAsync(id);
        if (employee == null)
            return NotFound();

        _context.Employee.Remove(employee);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
