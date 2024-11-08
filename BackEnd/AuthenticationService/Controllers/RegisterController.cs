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

        public RegisterController(EbayContext context, PasswordHandler passwordHandler)
        {
            _context = context;
            _passwordHandler = passwordHandler;
        }

        // POST: api/Register
        [HttpPost]
        public IActionResult Register([FromBody] RegisterDTO registerDto)
        {
            if (string.IsNullOrWhiteSpace(registerDto.Username) || string.IsNullOrWhiteSpace(registerDto.Password))
            {
                return BadRequest(new { message = "Username and password are required" });
            }

            if (_context.Users.Any(u => u.Username == registerDto.Username))
            {
                return StatusCode(StatusCodes.Status409Conflict, new { message = "Username already exists" });
            }

            // Map RegisterDTO to User model
            var user = new User
            {
                Id = System.Guid.NewGuid().ToString(),
                Username = registerDto.Username,
                Password = _passwordHandler.HashPassword(registerDto.Password),
                Email = registerDto.Email,
                Address = registerDto.Address,
                PhoneNumber = registerDto.PhoneNumber,
                Roles = "User"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Register), new { id = user.Id }, new { message = "User registered successfully" });
        }
    }
}
