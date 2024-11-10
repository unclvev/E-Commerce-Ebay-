using AuthenticationService.DTO;
using AuthenticationService.Utils;
using DataBusiness_.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/[controller]")]
[ApiController]
public class OtpController : ControllerBase
{
    private readonly EbayContext _context;
    private readonly PasswordHandler _passwordHandler;

    public OtpController(EbayContext context, PasswordHandler passwordHandler)
    {
        _context = context;
        _passwordHandler = passwordHandler;
    }

    [HttpPost("check-otp")]
    public async Task<IActionResult> CheckOtp([FromBody] OtpCheckDTO otpCheck)
    {
        // Lấy OTP từ cookies
        var savedOtp = Request.Cookies["Otp"];
        var otpExpiryString = Request.Cookies["OtpExpiry"];

        if (string.IsNullOrEmpty(savedOtp))
        {
            return BadRequest("OTP is missing or expired.");
        }

        var otpExpiry = DateTime.Parse(otpExpiryString ?? DateTime.MinValue.ToString());

        // Kiểm tra OTP
        if (otpCheck.Otp != savedOtp)
        {
            return BadRequest("Invalid OTP.");
        }

        // Kiểm tra nếu OTP đã hết hạn
        if (DateTime.UtcNow > otpExpiry)
        {
            return BadRequest("OTP has expired.");
        }

        // Lấy thông tin người dùng từ cookies
        var userDataJson = Request.Cookies["TempUserData"];
        if (userDataJson == null) return BadRequest("Session expired. Please register again.");

        var registerDto = JsonSerializer.Deserialize<RegisterDTO>(userDataJson);

        // Tạo và lưu người dùng vào database
        var user = new User
        {
            Id = Guid.NewGuid().ToString(),
            Username = registerDto.Username,
            Password = _passwordHandler.HashPassword(registerDto.Password),
            Email = registerDto.Email,
            Address = registerDto.Address,
            PhoneNumber = registerDto.PhoneNumber,
            Roles = "User"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Xóa cookies sau khi tạo người dùng thành công
        Response.Cookies.Delete("TempUserData");
        Response.Cookies.Delete("Otp");
        Response.Cookies.Delete("OtpExpiry");

        return Ok("User registered successfully.");
    }

}
