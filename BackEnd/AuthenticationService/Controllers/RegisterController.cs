using AuthenticationService.DTO;
using AuthenticationService.Utils;
using DataBusiness_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationService.Controllers
{
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

        // POST: api/Register
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

            // Map RegisterDTO to User model
            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Username = registerDto.Username,
                Password = _passwordHandler.HashPassword(registerDto.Password),
                Email = registerDto.Email,
                Address = registerDto.Address,
                PhoneNumber = registerDto.PhoneNumber,
                Roles = "User",
                Otp = otp,  // Store OTP if you have an OTP field in your database
                Otpexpiry = DateTime.UtcNow.AddMinutes(10)  // Optional expiry time for OTP
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            // Prepare the email request with OTP
            var mailRequest = new Mailrequest
            {
                Email = registerDto.Email,
                Subject = "Your OTP Code",
                Emailbody = $"<h1>Hello, {registerDto.Username}!</h1><p>Your OTP code is: <strong>{otp}</strong></p><p>This code will expire in 10 minutes.</p>"
            };

            // Send OTP email
            await _email.SendEmailAsync(mailRequest);

            return CreatedAtAction(nameof(Register), new { id = user.Id }, new { message = "User registered successfully. OTP sent to email." });
        }
    }
}
