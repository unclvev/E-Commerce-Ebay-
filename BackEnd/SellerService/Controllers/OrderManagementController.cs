using Microsoft.AspNetCore.Mvc;
using SellerService.DTO;
using SellerService.DAO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SellerService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderManagementController : ControllerBase
    {
        private readonly SellerDAO _sellerDAO;

        public OrderManagementController(SellerDAO sellerDAO)
        {
            _sellerDAO = sellerDAO ?? throw new ArgumentNullException(nameof(sellerDAO));
        }

        // Get all orders
        [HttpGet("orders")]
        public async Task<ActionResult<List<OrderResponseDTO>>> GetAllOrders()
        {
            var orders = await _sellerDAO.GetAllOrdersAsync();
            return Ok(orders);
        }

        // Get order by ID
        [HttpGet("orders/{id}")]
        public async Task<ActionResult<OrderResponseDTO>> GetOrderById(string id)
        {
            var order = await _sellerDAO.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        // Get all items in an order by order ID
        [HttpGet("orders/{orderId}/items")]
        public async Task<ActionResult<List<OrderItemResponseDTO>>> GetOrderItems(string orderId)
        {
            var orderItems = await _sellerDAO.GetOrderItemsByOrderIdAsync(orderId);
            return Ok(orderItems);
        }

        // Update order status or information
        [HttpPut("orders/{id}")]
        public async Task<IActionResult> UpdateOrder(string id, OrderResponseDTO orderUpdate)
        {
            var success = await _sellerDAO.UpdateOrderAsync(id, orderUpdate);
            if (success == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        // Delete order by ID
        [HttpDelete("orders/{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            var success = await _sellerDAO.DeleteOrderAsync(id);
            if (success == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
