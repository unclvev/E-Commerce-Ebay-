using Microsoft.AspNetCore.Mvc;
using SellerService.DTO;
using SellerService.DAO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SellerService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductManagementController : ControllerBase
    {
        private readonly SellerDAO _sellerDAO;

        public ProductManagementController(SellerDAO sellerDAO)
        {
            _sellerDAO = sellerDAO ?? throw new ArgumentNullException(nameof(sellerDAO));
        }
        //Product
        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            var product = await _sellerDAO.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound($"Product with ID: {id} not found");
            }

            return Ok(product);
        }
        // Get all Seller Listings
        [HttpGet("listings")]
        public async Task<ActionResult<List<SellerListingResponseDTO>>> GetAllSellerListings()
        {
            var listings = await _sellerDAO.GetAllSellerListingsAsync();
            return Ok(listings);
        }

        // Get Seller Listing by ID
        [HttpGet("listing/{id}")]
        public async Task<IActionResult> GetSellerListingById(string id)
        {
            var listing = await _sellerDAO.GetSellerListingByIdAsync(id);

            if (listing == null)
            {
                return NotFound($"Listing with ID: {id} not found");
            }

            return Ok(listing);
        }

        [HttpPost("listings")]
        public async Task<ActionResult<SellerListingResponseDTO>> AddSellerListing([FromBody] SellerListingWithProductDTO dto)
        {
            var newListing = await _sellerDAO.CreateSellerListingAsync(dto.SellerListing, dto.Product);
            if (newListing == null)
            {
                return BadRequest("Failed to create listing or product.");
            }
            return CreatedAtAction(nameof(GetSellerListingById), new { id = newListing.Id }, newListing);
        }


        // Update existing Seller Listing
        [HttpPut("listings/{id}")]
        public async Task<IActionResult> UpdateSellerListing(string id, SellerListingResponseDTO dto)
        {
            var success = await _sellerDAO.UpdateSellerListingAsync(id, dto);
            if (success == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        // Delete Seller Listing by ID
        [HttpDelete("listings/{id}")]
        public async Task<ActionResult<SellerListingResponseDTO>> DeleteSellerListing(string id)
        {
            var deletedListing = await _sellerDAO.DeleteSellerListingAsync(id);
            if (deletedListing == null)
            {
                return NotFound();
            }
            return Ok(deletedListing);
        }
        //Get Listings by Seller email
        [HttpGet("listings/{sellerId}")]
        public async Task<IActionResult> GetListingsBySellerId(string sellerEmail)
        {
            var listings = await _sellerDAO.GetListingsBySellerEmailAsync(sellerEmail);

            if (listings == null || !listings.Any())
            {
                return NotFound($"No listings found for seller with email: {sellerEmail}");
            }

            return Ok(listings);
        }
        //Get Listing by Product ID
        [HttpGet("listing/product/{productId}")]
        public async Task<IActionResult> GetListingByProductId(string productId)
        {
            var listing = await _sellerDAO.GetListingByProductIdAsync(productId);

            if (listing == null)
            {
                return NotFound($"Listing with product ID: {productId} not found");
            }

            return Ok(listing);
        }
    }
}
