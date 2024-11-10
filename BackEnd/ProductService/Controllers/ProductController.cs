using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBusiness_.Models;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly EbayContext _context;

        public ProductController(EbayContext context)
        {
            _context = context;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategoriesWithProducts()
        {
            var categoriesWithProducts = await _context.Categories
                .Include(c => c.Listings)  
                .ThenInclude(l => l.Product)
                .Select(c => new CategoryDTO
                {
                    CategoryName = c.Name,
                    products = c.Listings.Select(l => new ProductDTO
                    {
                        Name = l.Product.Name,
                        Description = l.Product.Description,
                        Price = l.Product.Price,
                        OriginalPrice = l.Product.OriginalPrice,
                        ImageUrl = l.Product.ProductImages.FirstOrDefault().ImageUrl
                    }).ToList()
                }).ToListAsync();

            return Ok(categoriesWithProducts);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchProducts(string? keyword, string? category)
        {
            var productsQuery = _context.Products.AsQueryable();

            // Filter by category if specified
            if (!string.IsNullOrEmpty(category))
            {
                productsQuery = productsQuery
                    .Where(p => p.Listings.Any(l => l.Category.Name == category));
            }

            // Filter by keyword if specified
            if (!string.IsNullOrEmpty(keyword))
            {
                productsQuery = productsQuery.Where(p => p.Name.Contains(keyword) || p.Description.Contains(keyword));
            }

            // Select necessary fields for the frontend
            var products = await productsQuery
                .Select(p => new ProductDTO
                {
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    OriginalPrice = p.OriginalPrice,
                    ImageUrl = p.ProductImages.FirstOrDefault().ImageUrl
                })
                .ToListAsync();

            if (products.Count == 0)
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }



        [HttpGet("category/{categoryName}")]
        public async Task<IActionResult> GetProductsByCategory(string categoryName)
        {
            var productsByCategory = await _context.Categories
                .Where(c => c.Name == categoryName)
                .Include(c => c.Listings)
                .ThenInclude(l => l.Product)
                .Select(c => new CategoryDTO
                {
                    CategoryName = c.Name,
                    products = c.Listings.Select(l => new ProductDTO
                    {
                        Name = l.Product.Name,
                        Description = l.Product.Description,
                        Price = l.Product.Price,
                        OriginalPrice = l.Product.OriginalPrice,
                        ImageUrl = l.Product.ProductImages.FirstOrDefault().ImageUrl
                    }).ToList()
                }).FirstOrDefaultAsync();

            if (productsByCategory == null)
            {
                return NotFound("Category not found.");
            }

            return Ok(productsByCategory.products);
        }
    }
}