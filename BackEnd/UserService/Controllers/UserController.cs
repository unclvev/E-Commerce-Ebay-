using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
 // Thư mục chứa model User
using Microsoft.EntityFrameworkCore;
using System;
using DataBusiness_.Models;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly EBayContext _context;

        public UserController(EBayContext context)
        {
            _context = context;
        }

        // DTO cho thông tin người dùng cơ bản
        public class UserDTO
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Address { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
        }

        // DTO cho việc chỉnh sửa thông tin người dùng
        public class EditUserDTO
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Address { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
        }

        // DTO cho việc thay đổi mật khẩu
        public class ChangePasswordDTO
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
        }

        // Hiển thị hồ sơ người dùng
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserProfile(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Chỉ trả về các thông tin cơ bản của người dùng
            var userDTO = new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email
            };

            return Ok(userDTO);
        }

        // Cập nhật thông tin cá nhân của người dùng
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditUserProfile(string id, [FromBody] EditUserDTO updatedUserDTO)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Cập nhật các thông tin của người dùng từ DTO
            user.FirstName = updatedUserDTO.FirstName;
            user.LastName = updatedUserDTO.LastName;
            user.Address = updatedUserDTO.Address;
            user.PhoneNumber = updatedUserDTO.PhoneNumber;
            user.Email = updatedUserDTO.Email;

            try
            {
                await _context.SaveChangesAsync();

                // Sau khi cập nhật, chỉ trả về thông tin cơ bản mà không có các quan hệ phụ thuộc
                var updatedUserDTOResponse = new UserDTO
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Address = user.Address,
                    PhoneNumber = user.PhoneNumber,
                    Email = user.Email
                };

                return Ok(new { message = "User profile updated successfully", user = updatedUserDTOResponse });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error updating user profile: {ex.Message}" });
            }
        }

        // Thay đổi mật khẩu
        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordDTO model)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Kiểm tra mật khẩu cũ
            if (user.Password != model.OldPassword)
                return BadRequest(new { message = "Old password is incorrect" });

            // Cập nhật mật khẩu mới
            user.Password = model.NewPassword;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Password changed successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error changing password: {ex.Message}" });
            }
        }
    }
}
