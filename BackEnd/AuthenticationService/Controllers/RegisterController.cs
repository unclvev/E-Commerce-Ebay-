using AuthenticationService.DTO;
using AuthenticationService.Utils;
using DataBusiness_.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/[controller]")]
[ApiController]
public class RegisterController : ControllerBase
{
    private readonly EbayContext _context;
    private readonly PasswordHandler _passwordHandler;
    private readonly Email _email;

    public RegisterController(EbayContext context, PasswordHandler passwordHandler, Email email)
    {
        _context = context;
        _passwordHandler = passwordHandler;
        _email = email;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
    {
        if (string.IsNullOrWhiteSpace(registerDto.Username) || string.IsNullOrWhiteSpace(registerDto.Password))
        {
            return BadRequest(new { message = "Username and password are required" });
        }

        if (_context.Users.Any(u => u.Username == registerDto.Username))
        {
            return StatusCode(StatusCodes.Status409Conflict, new { message = "Username already exists" });
        }

        // Generate OTP
        var otp = new Random().Next(100000, 999999).ToString();

        // Save OTP and other temporary info in cookies
        var userData = JsonSerializer.Serialize(registerDto);
        Response.Cookies.Append("TempUserData", userData, new CookieOptions
        {
            HttpOnly = true, // Cookie không thể truy cập từ JavaScript
            SameSite = SameSiteMode.Lax, // Đảm bảo gửi cookie qua các yêu cầu CORS
            Secure = false, // Đặt là true nếu sử dụng HTTPS
            Expires = DateTime.UtcNow.AddMinutes(10) // Cookie hết hạn sau 10 phút
        });

        Response.Cookies.Append("Otp", otp, new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Secure = false,
            Expires = DateTime.UtcNow.AddMinutes(10)
        });

        Response.Cookies.Append("OtpExpiry", DateTime.UtcNow.AddMinutes(10).ToString(), new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Secure = false,
            Expires = DateTime.UtcNow.AddMinutes(10)
        });

        // Send OTP email
        var mailRequest = new Mailrequest
        {
            Email = registerDto.Email,
            Subject = "Your OTP Code",
            Emailbody = $"<h1>Hello, {registerDto.Username}!</h1><p>Your OTP code is: <strong>{otp}</strong></p><p>This code will expire in 10 minutes.</p>"
        };

        await _email.SendEmailAsync(mailRequest);

        return Ok(new { message = "OTP sent to email." });
    }
}
