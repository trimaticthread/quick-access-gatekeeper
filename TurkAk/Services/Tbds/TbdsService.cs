using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using TurkAk.Data;
using TurkAk.ViewModels.Tbds;
using TurkAk.Models;

namespace TurkAk.Services.Tbds;

public class TbdsService(AppDbContext context, HttpClient httpClient)
{
    private readonly AppDbContext _context = context;
    private readonly HttpClient _httpClient = httpClient;

    public async Task<CalibrationCustomerDataDto?> GetCalibrationCustomerDataAsync()
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.GetAsync("https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCustomerGetData/tr");

        if (!response.IsSuccessStatusCode)
            throw new Exception("Türkak servisine ulaşılamadı.");

        return await response.Content.ReadFromJsonAsync<CalibrationCustomerDataDto>();
    }

    public async Task<List<CertificateCustomerDto>?> GetCertificateCustomerListAsync()
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.GetAsync("https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCertificateGetData/");

        if (!response.IsSuccessStatusCode)
            throw new Exception("Türkak Certificate listesine ulaşılamadı.");

        return await response.Content.ReadFromJsonAsync<List<CertificateCustomerDto>>();
    }


    public async Task<bool> SaveCalibrationCustomerAsync(CalibrationCustomerSaveDto dto)
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.PostAsJsonAsync(
            "https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCustomerSaveData/tr",
            dto
        );

        return response.IsSuccessStatusCode;
    }

    public async Task<CertificateCustomerDto?> GetCertificateCustomerAsync(Guid customerId)
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.GetAsync($"https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCertificateGetCustomer/{customerId}");

        if (!response.IsSuccessStatusCode)
            throw new Exception("Müşteri bilgisi alınamadı.");

        return await response.Content.ReadFromJsonAsync<CertificateCustomerDto>();
    }

    public async Task<bool> SaveCalibrationCertificateAsync(CalibrationCertificateSaveDto dto)
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.PostAsJsonAsync(
            "https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCertificateSaveData/tr",
            dto
        );

        return response.IsSuccessStatusCode;
    }

    public async Task<CalibrationCertificateDetailDto?> GetCertificateDetailAsync(Guid customerId)
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.GetAsync(
            $"https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCertificateGetCertificate/{customerId}/tr"
        );

        if (!response.IsSuccessStatusCode)
            return null;

        return await response.Content.ReadFromJsonAsync<CalibrationCertificateDetailDto>();
    }

    public async Task<bool> DeleteCertificateAsync(Guid certificateId)
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.DeleteAsync(
            $"https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCertificateDeleteData/{certificateId}"
        );

        return response.IsSuccessStatusCode;
    }


    public async Task<bool> SaveCertificateAsync(CalibrationCertificateSaveDto dto)
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.PostAsJsonAsync(
            "https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCertificateSaveData/tr",
            dto
        );

        return response.IsSuccessStatusCode;
    }


    public async Task<List<CalibrationCertificateListItemDto>?> GetCertificateListAsync()
    {
        var tokenData = await _context.TurkAkaccs.FirstOrDefaultAsync();

        if (tokenData is null || string.IsNullOrWhiteSpace(tokenData.Token))
            throw new Exception("Token bulunamadı.");

        if (tokenData.TokenExpiry < DateTime.UtcNow)
            throw new Exception("Token süresi dolmuş.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", tokenData.Token);

        var response = await _httpClient.GetAsync("https://api.turkak.org.tr/TBDS/api/v1/CalibrationService/CalibrationCertificateGetList/tr");

        if (!response.IsSuccessStatusCode)
            throw new Exception("Sertifika listesi alınamadı.");

        return await response.Content.ReadFromJsonAsync<List<CalibrationCertificateListItemDto>>();
    }



}
