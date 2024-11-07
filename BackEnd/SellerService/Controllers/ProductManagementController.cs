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

        // Add new Seller Listing
        [HttpPost("listings")]
        public async Task<ActionResult<SellerListingResponseDTO>> AddSellerListing(SellerListingResponseDTO dto)
        {
            var newListing = await _sellerDAO.CreateSellerListingAsync(dto);
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
        [HttpGet("listings/{sellerId}")]
        public async Task<IActionResult> GetListingsBySellerId(string sellerId)
        {
            var listings = await _sellerDAO.GetListingsBySellerIdAsync(sellerId);

            if (listings == null || !listings.Any())
            {
                return NotFound($"No listings found for seller with ID: {sellerId}");
            }

            return Ok(listings);
        }
    }
}
