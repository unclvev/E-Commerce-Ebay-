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
        private readonly EBayContext _context;

        public ProductController(EBayContext context)
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
        [HttpGet("search/{keyword?}")]
        public async Task<IActionResult> SearchProducts(string? keyword)
        {
            var productsQuery = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(keyword))
            {
                productsQuery = productsQuery.Where(p => p.Name.Contains(keyword) || p.Description.Contains(keyword));
            }

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

    }
}
