using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurkAk.Data;
using TurkAk.Models;
using TurkAk.ViewModels;

namespace TurkAk.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersCertificatesController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var certificates = await _context.CustomersCertificates
            .Include(c => c.CustomerNavigation)
            .Include(c => c.DeviceTypeNavigation)
            .Include(c => c.CalibratorEmployeeNavigation)
            .Include(c => c.ReferenceCalibratorNavigation)
            .Select(c => new CustomersCertificateDto
            {
                CertificateId = c.CertificateId,
                Customer = c.Customer,
                DeviceType = c.DeviceType,
                DeviceSerialNo = c.DeviceSerialNo,
                ReferenceCalibrator = c.ReferenceCalibrator,
                ReferenceCalibratorSerialNo = c.ReferenceCalibratorSerialNo,
                CalibratorEmployee = c.CalibratorEmployee,
                CalibratorLocation = c.CalibratorLocation,
                CalibratorDate = c.CalibratorDate,
                FirstAirDate = c.FirstAirDate,
                RevisionDate = c.RevisionDate,
                RevisionNote = c.RevisionNote,
                CustomerName = c.CustomerNavigation.Title,
                DeviceTypeName = c.DeviceTypeNavigation.DeviceTypeName,
                EmployeeName = c.CalibratorEmployeeNavigation.EmployeeNameSurname,
                ReferenceDeviceName = c.ReferenceCalibratorNavigation.ReferenceDeviceName
            })
            .ToListAsync();

        return Ok(certificates);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var certificate = await _context.CustomersCertificates
            .Include(c => c.CustomerNavigation)
            .Include(c => c.DeviceTypeNavigation)
            .Include(c => c.CalibratorEmployeeNavigation)
            .Include(c => c.ReferenceCalibratorNavigation)
            .Where(c => c.CertificateId == id)
            .Select(c => new CustomersCertificateDto
            {
                CertificateId = c.CertificateId,
                Customer = c.Customer,
                DeviceType = c.DeviceType,
                DeviceSerialNo = c.DeviceSerialNo,
                ReferenceCalibrator = c.ReferenceCalibrator,
                ReferenceCalibratorSerialNo = c.ReferenceCalibratorSerialNo,
                CalibratorEmployee = c.CalibratorEmployee,
                CalibratorLocation = c.CalibratorLocation,
                CalibratorDate = c.CalibratorDate,
                FirstAirDate = c.FirstAirDate,
                RevisionDate = c.RevisionDate,
                RevisionNote = c.RevisionNote,
                CustomerName = c.CustomerNavigation.Title,
                DeviceTypeName = c.DeviceTypeNavigation.DeviceTypeName,
                EmployeeName = c.CalibratorEmployeeNavigation.EmployeeNameSurname,
                ReferenceDeviceName = c.ReferenceCalibratorNavigation.ReferenceDeviceName
            })
            .FirstOrDefaultAsync();

        return certificate == null ? NotFound() : Ok(certificate);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CustomersCertificateDto dto)
    {
        var certificate = new CustomersCertificate
        {
            Customer = dto.Customer,
            DeviceType = dto.DeviceType,
            DeviceSerialNo = dto.DeviceSerialNo,
            ReferenceCalibrator = dto.ReferenceCalibrator,
            ReferenceCalibratorSerialNo = dto.ReferenceCalibratorSerialNo,
            CalibratorEmployee = dto.CalibratorEmployee,
            CalibratorLocation = dto.CalibratorLocation,
            CalibratorDate = dto.CalibratorDate,
            FirstAirDate = dto.FirstAirDate,
            RevisionDate = dto.RevisionDate,
            RevisionNote = dto.RevisionNote
        };

        _context.CustomersCertificates.Add(certificate);
        await _context.SaveChangesAsync();

        dto.CertificateId = certificate.CertificateId;
        return CreatedAtAction(nameof(GetById), new { id = dto.CertificateId }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CustomersCertificateDto dto)
    {
        if (id != dto.CertificateId)
            return BadRequest("ID uyuşmuyor.");

        var certificate = await _context.CustomersCertificates.FindAsync(id);
        if (certificate == null)
            return NotFound();

        certificate.Customer = dto.Customer;
        certificate.DeviceType = dto.DeviceType;
        certificate.DeviceSerialNo = dto.DeviceSerialNo;
        certificate.ReferenceCalibrator = dto.ReferenceCalibrator;
        certificate.ReferenceCalibratorSerialNo = dto.ReferenceCalibratorSerialNo;
        certificate.CalibratorEmployee = dto.CalibratorEmployee;
        certificate.CalibratorLocation = dto.CalibratorLocation;
        certificate.CalibratorDate = dto.CalibratorDate;
        certificate.FirstAirDate = dto.FirstAirDate;
        certificate.RevisionDate = dto.RevisionDate;
        certificate.RevisionNote = dto.RevisionNote;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var certificate = await _context.CustomersCertificates.FindAsync(id);
        if (certificate == null)
            return NotFound();

        _context.CustomersCertificates.Remove(certificate);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
