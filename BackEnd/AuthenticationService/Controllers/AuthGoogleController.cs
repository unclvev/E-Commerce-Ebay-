using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using DataBusiness_.Models;
using Microsoft.EntityFrameworkCore;
using AuthenticationService.Utils;


namespace AuthenticationService.Controllers
{
    
    [ApiController]
    public class AuthGoogleController : ControllerBase
    {
        private readonly EbayContext _context;
        private readonly IConfiguration _config;
        private readonly Jwt _jwt;


        public AuthGoogleController(EbayContext context, IConfiguration config,Jwt jwt)
        {
            _context = context;
            _config = config;
            _jwt = jwt;
        }

        [HttpPost("api/GoogleLogin")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto request)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token);

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);
                if (user == null)
                {
                    user = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = payload.Email,
                        FirstName = payload.GivenName,
                        LastName = payload.FamilyName,
                        Username = payload.Name,
                        Roles = "User"
                    };
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }

                var jwtToken = _jwt.CreateJWTToken(user, user.Roles);
                return Ok(new { jwt = jwtToken });
            }
            catch (Exception ex)
            {
                return Unauthorized("Google login failed");
            }
        }

      
    }

    public class GoogleLoginDto
    {
        public string Token { get; set; }
    }
}
