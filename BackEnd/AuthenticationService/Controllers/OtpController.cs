using AuthenticationService.DTO;
using DataBusiness_.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtpController : ControllerBase
    {
        private readonly EbayContext _context;

        public OtpController(EbayContext context)
        {
            _context = context;
        }

        [HttpPost("check-otp")]
        public async Task<IActionResult> CheckOtp([FromBody] OtpCheckDTO otpCheck)
        {
            // Lấy người dùng có OTP tương ứng từ cơ sở dữ liệu
            var user = await _context.Users
                .Where(u => u.Otp == otpCheck.Otp)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest("Invalid OTP.");
            }

            // Kiểm tra nếu OTP đã hết hạn
            if (user.Otpexpiry < DateTime.Now)
            {
                return BadRequest("OTP has expired.");
            }

            return Ok("OTP is valid.");
        }
    }
}
