using DataBusiness_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AuthenticationService.Utils;
using AuthenticationService.DTO;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly EbayContext _context;
        private readonly Jwt _jwt;
        private readonly PasswordHandler _passwordHandler;
        public static User user = new User();

        public LoginController(EbayContext context, Jwt jwt, PasswordHandler passwordHandler)
        {
            _context = context;
            _jwt = jwt;
            _passwordHandler = passwordHandler;
        }

        // POST: api/Login
        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO user)
        {
            // Tìm kiếm người dùng theo username, email hoặc phone number
            var user_ = _context.Users
                                .FirstOrDefault(u => u.Username == user.Username || u.Email == user.Username || u.PhoneNumber == user.Username);

            if (user_ == null || !_passwordHandler.VerifyPassword(user.Password, user_.Password))
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // Tạo JWT và refresh token
            var jwt = _jwt.CreateJWTToken(user_, user_.Roles);


            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken);

            return Ok(new
            {
                jwt = jwt
            });
        }

        // POST: api/Login/refresh-token
        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.RefreshTokenExpiryTime < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = _jwt.CreateJWTToken(user, user.Roles);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken);

            return Ok(token);
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }


        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.RefreshTokenCreate = newRefreshToken.Created;
            user.RefreshTokenExpiryTime = newRefreshToken.Expires;
        }

    }
}
