using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurkAk.Data;
using TurkAk.Models;
using TurkAk.ViewModels;

namespace TurkAk.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _context.Customers
            .Select(c => new CustomerDto
            {
                CustomersId = c.CustomersId,
                Title = c.Title,
                TaxNumber = c.TaxNumber,
                BrandInfo = c.BrandInfo,
                CustomersAddress = c.CustomersAddress,
                PhoneNumber = c.PhoneNumber,
                Email = c.Email,
                Website = c.Website,
                Country = c.Country,
                City = c.City,
                Files = c.Files,
                AccountType = c.AccountType
            })
            .ToListAsync();

        return Ok(customers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _context.Customers
            .Where(c => c.CustomersId == id)
            .Select(c => new CustomerDto
            {
                CustomersId = c.CustomersId,
                Title = c.Title,
                TaxNumber = c.TaxNumber,
                BrandInfo = c.BrandInfo,
                CustomersAddress = c.CustomersAddress,
                PhoneNumber = c.PhoneNumber,
                Email = c.Email,
                Website = c.Website,
                Country = c.Country,
                City = c.City,
                Files = c.Files,
                AccountType = c.AccountType
            })
            .FirstOrDefaultAsync();

        return customer == null ? NotFound() : Ok(customer);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CustomerDto dto)
    {
        var customer = new Customer
        {
            Title = dto.Title,
            TaxNumber = dto.TaxNumber,
            BrandInfo = dto.BrandInfo,
            CustomersAddress = dto.CustomersAddress,
            PhoneNumber = dto.PhoneNumber,
            Email = dto.Email,
            Website = dto.Website,
            Country = dto.Country,
            City = dto.City,
            Files = dto.Files,
            AccountType = dto.AccountType
        };

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        dto.CustomersId = customer.CustomersId;
        return CreatedAtAction(nameof(GetById), new { id = dto.CustomersId }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CustomerDto dto)
    {
        if (id != dto.CustomersId)
            return BadRequest("ID uyuşmuyor.");

        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
            return NotFound();

        customer.Title = dto.Title;
        customer.TaxNumber = dto.TaxNumber;
        customer.BrandInfo = dto.BrandInfo;
        customer.CustomersAddress = dto.CustomersAddress;
        customer.PhoneNumber = dto.PhoneNumber;
        customer.Email = dto.Email;
        customer.Website = dto.Website;
        customer.Country = dto.Country;
        customer.City = dto.City;
        customer.Files = dto.Files;
        customer.AccountType = dto.AccountType;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
            return NotFound();

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
