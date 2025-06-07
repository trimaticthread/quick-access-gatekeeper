using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurkAk.Data;
using TurkAk.Models;
using TurkAk.ViewModels;

namespace TurkAk.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReferenceDevicesController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var devices = await _context.ReferenceDeviceAdds
            .Select(d => new ReferenceDeviceAddDto
            {
                ReferenceDeviceId = d.ReferenceDeviceId,
                ReferenceDeviceName = d.ReferenceDeviceName,
                SerialNo = d.SerialNo,
                Comment = d.Comment,
                DeviceType = d.DeviceType,
                Status = d.Status,
                LastCalibratorDate = d.LastCalibratorDate,
                NextCalibratorDate = d.NextCalibratorDate
            })
            .ToListAsync();

        return Ok(devices);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var device = await _context.ReferenceDeviceAdds
            .Where(d => d.ReferenceDeviceId == id)
            .Select(d => new ReferenceDeviceAddDto
            {
                ReferenceDeviceId = d.ReferenceDeviceId,
                ReferenceDeviceName = d.ReferenceDeviceName,
                SerialNo = d.SerialNo,
                Comment = d.Comment,
                DeviceType = d.DeviceType,
                Status = d.Status,
                LastCalibratorDate = d.LastCalibratorDate,
                NextCalibratorDate = d.NextCalibratorDate
            })
            .FirstOrDefaultAsync();

        return device == null ? NotFound() : Ok(device);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ReferenceDeviceAddDto dto)
    {
        var device = new ReferenceDeviceAdd
        {
            ReferenceDeviceName = dto.ReferenceDeviceName,
            SerialNo = dto.SerialNo,
            Comment = dto.Comment,
            DeviceType = dto.DeviceType,
            Status = dto.Status,
            LastCalibratorDate = dto.LastCalibratorDate,
            NextCalibratorDate = dto.NextCalibratorDate
        };

        _context.ReferenceDeviceAdds.Add(device);
        await _context.SaveChangesAsync();

        dto.ReferenceDeviceId = device.ReferenceDeviceId;
        return CreatedAtAction(nameof(GetById), new { id = dto.ReferenceDeviceId }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ReferenceDeviceAddDto dto)
    {
        if (id != dto.ReferenceDeviceId)
            return BadRequest("ID uyuşmuyor.");

        var device = await _context.ReferenceDeviceAdds.FindAsync(id);
        if (device == null)
            return NotFound();

        device.ReferenceDeviceName = dto.ReferenceDeviceName;
        device.SerialNo = dto.SerialNo;
        device.Comment = dto.Comment;
        device.DeviceType = dto.DeviceType;
        device.Status = dto.Status;
        device.LastCalibratorDate = dto.LastCalibratorDate;
        device.NextCalibratorDate = dto.NextCalibratorDate;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var device = await _context.ReferenceDeviceAdds.FindAsync(id);
        if (device == null)
            return NotFound();

        _context.ReferenceDeviceAdds.Remove(device);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
