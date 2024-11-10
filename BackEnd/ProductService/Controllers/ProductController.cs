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
                        .ThenInclude(p => p.Colors)
                .Include(c => c.Listings)
                    .ThenInclude(l => l.Product)
                        .ThenInclude(p => p.Sizes)
                .Include(c => c.Listings)
                    .ThenInclude(l => l.Product)
                        .ThenInclude(p => p.Stores)
                .Select(c => new CategoryDTO
                {
                    CategoryName = c.Name,
                    products = c.Listings.Select(l => new ProductDTO
                    {
                        Name = l.Product.Name,
                        Description = l.Product.Description,
                        Price = l.Product.Price,
                        OriginalPrice = l.Product.OriginalPrice,
                        ImageUrl = l.Product.ProductImages.FirstOrDefault().ImageUrl,
                        colors = l.Product.Colors.Select(color => new ColorDTO
                        {
                            ColorName = color.Name
                        }).ToList(),
                        sizes = l.Product.Sizes.Select(size => new SizeDTO
                        {
                            SizeName = size.Name
                        }).ToList(),
                        stores = l.Product.Stores.Select(store => new StoreDTO
                        {
                            StoreName = store.Name
                        }).ToList()
                    }).ToList(),
                    availableSizes = c.Listings.SelectMany(l => l.Product.Sizes)
                                       .Select(size => size.Name)
                                       .Distinct()
                                       .ToList(), // Lấy danh sách size riêng cho category
                    availableColors = c.Listings.SelectMany(l => l.Product.Colors)
                                        .Select(color => color.Name)
                                        .Distinct()
                                        .ToList()
                }).ToListAsync();
            return Ok(categoriesWithProducts);
        }

        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategoryId(
            string categoryId,
            [FromQuery] decimal? minPrice,    // Lọc theo khoảng giá
            [FromQuery] decimal? maxPrice,
            [FromQuery] List<string>? sizes,  // Lọc theo size
            [FromQuery] List<string>? colors) // Lọc theo color
        {
            var categoryWithProducts = await _context.Categories
                .Where(c => c.Id == categoryId)
                .Include(c => c.Listings)
                    .ThenInclude(l => l.Product)
                        .ThenInclude(p => p.Colors)
                .Include(c => c.Listings)
                    .ThenInclude(l => l.Product)
                        .ThenInclude(p => p.Sizes)
                .Include(c => c.Listings)
                    .ThenInclude(l => l.Product)
                        .ThenInclude(p => p.Stores)
                .Select(c => new CategoryDTO
                {
                    CategoryName = c.Name,
                    products = c.Listings
                        .Where(l =>
                            (!minPrice.HasValue || l.Product.Price >= minPrice.Value) &&  // Lọc theo khoảng giá nếu có
                            (!maxPrice.HasValue || l.Product.Price <= maxPrice.Value) &&
                            (sizes == null || sizes.Count == 0 || l.Product.Sizes.Any(s => sizes.Contains(s.Name))) &&  // Lọc theo size nếu có
                            (colors == null || colors.Count == 0 || l.Product.Colors.Any(cl => colors.Contains(cl.Name))))  // Lọc theo color nếu có
                        .Select(l => new ProductDTO
                        {
                            Name = l.Product.Name,
                            Description = l.Product.Description,
                            Price = l.Product.Price,
                            OriginalPrice = l.Product.OriginalPrice,
                            ImageUrl = l.Product.ProductImages.FirstOrDefault().ImageUrl,
                            colors = l.Product.Colors.Select(color => new ColorDTO
                            {
                                ColorName = color.Name
                            }).ToList(),
                            sizes = l.Product.Sizes.Select(size => new SizeDTO
                            {
                                SizeName = size.Name
                            }).ToList(),
                            stores = l.Product.Stores.Select(store => new StoreDTO
                            {
                                StoreName = store.Name
                            }).ToList()
                        }).ToList(),
                    availableSizes = c.Listings.SelectMany(l => l.Product.Sizes)
                                               .Select(size => size.Name)
                                               .Distinct()
                                               .ToList(),
                    availableColors = c.Listings.SelectMany(l => l.Product.Colors)
                                                .Select(color => color.Name)
                                                .Distinct()
                                                .ToList()
                }).FirstOrDefaultAsync();

            if (categoryWithProducts == null)
            {
                return NotFound($"Category with ID {categoryId} not found.");
            }

            return Ok(categoryWithProducts);
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
                    Id = p.Id,
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

        [HttpGet("products/{pid}")]
        public async Task<IActionResult> GetProductsById(string pid)
        {
            var productsById = await _context.Products
                .Where(c => c.Id == pid)
                .Include(c => c.Listings)
                .ThenInclude(l => l.Product)
                .Select(c => new CategoryDTO
                {
                    CategoryName = c.Name,
                    products = c.Listings.Select(l => new ProductDTO
                    {
                        Id = l.Product.Id,
                        Name = l.Product.Name,
                        Description = l.Product.Description,
                        Price = l.Product.Price,
                        OriginalPrice = l.Product.OriginalPrice,
                        ImageUrl = l.Product.ProductImages.FirstOrDefault().ImageUrl
                    }).ToList()
                }).FirstOrDefaultAsync();

            if (productsById == null)
            {
                return NotFound("Category not found.");
            }

            return Ok(productsById.products);
        }
    }
}