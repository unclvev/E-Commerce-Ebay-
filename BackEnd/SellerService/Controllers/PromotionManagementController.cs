using Microsoft.AspNetCore.Mvc;
using SellerService.DAO;
using SellerService.DTO;
using SellerService.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SellerService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromotionManagementController : ControllerBase
    {
        private readonly SellerDAO _sellerDAO;

        public PromotionManagementController(SellerDAO sellerDAO)
        {
            _sellerDAO = sellerDAO ?? throw new ArgumentNullException(nameof(sellerDAO));
        }
        //laays heets
        [HttpGet]
        public async Task<ActionResult<List<PromotionResponseDTO>>> GetAllPromotions()
        {
            var promotions = await _sellerDAO.GetAllPromotionsAsync();
            return Ok(promotions);
        }
        // Lấy danh sách khuyến mãi theo ProductId
        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetPromotionsByProductId(string productId)
        {
            var promotions = await _sellerDAO.GetPromotionsByProductIdAsync(productId);
            if (promotions == null || promotions.Count == 0)
                return NotFound($"No promotions found for product with ID: {productId}");

            return Ok(promotions);
        }

        // Thêm mới khuyến mãi
        [HttpPost]
        public async Task<IActionResult> AddPromotion([FromBody] PromotionResponseDTO promotion)
        {
            if (promotion == null || string.IsNullOrEmpty(promotion.ProductId))
                return BadRequest("Invalid promotion data");

            var result = await _sellerDAO.AddPromotionAsync(promotion);
            return CreatedAtAction(nameof(GetPromotionsByProductId), new { productId = promotion.ProductId }, result);
        }

        // Cập nhật khuyến mãi
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePromotion(string id, [FromBody] PromotionResponseDTO promotion)
        {
            if (promotion == null || promotion.Id != id)
                return BadRequest("Promotion data is invalid or does not match ID");

            var result = await _sellerDAO.UpdatePromotionAsync(id, promotion);
            if (result == null)
                return NotFound($"Promotion with ID: {id} not found");

            return Ok(result);
        }

        // Xóa khuyến mãi
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(string id)
        {
            var deleted = await _sellerDAO.DeletePromotionAsync(id);
            if (!deleted)
                return NotFound($"Promotion with ID: {id} not found");

            return NoContent();
        }
    }
}
