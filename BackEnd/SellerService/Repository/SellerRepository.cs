using DataBusiness_.Models;
using SellerService.DTO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace SellerService.Repository
{
    public class SellerRepository
    {
        private readonly EbayContext _context;

        public SellerRepository(EbayContext context)
        {
            _context = context;
        }

//ProductManagement

        //Create product
        public async Task<ProductResponseDTO> CreateProductAsync(ProductResponseDTO dto)
        {
            // Tính số lượng sản phẩm hiện có để xác định Id mới
            int productCount = await _context.Products.CountAsync();
            dto.Id = (productCount + 1).ToString(); // Chuyển đổi thành chuỗi nếu Id là kiểu string

            Product product = new Product
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                OriginalPrice = dto.OriginalPrice,
                SaleStartDate = dto.SaleStartDate,
                SaleEndDate = dto.SaleEndDate,
                StockQuantity = dto.StockQuantity
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return dto;
        }
        //delete product
        public async Task<ProductResponseDTO?> DeleteProductAsync(string id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return null;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return new ProductResponseDTO
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                OriginalPrice = product.OriginalPrice,
                SaleStartDate = product.SaleStartDate,
                SaleEndDate = product.SaleEndDate,
                StockQuantity = product.StockQuantity
            };
        }
        // Get all Seller Listings
        public async Task<List<SellerListingResponseDTO>> GetAllSellerListingsAsync()
        {
            return await _context.Listings
                .Include(s => s.Product)
                .Include(s => s.Category)
                .Include(s => s.Seller)
                .Include(s => s.Bids)
                .Select(s => new SellerListingResponseDTO
                {
                    Id = s.Id,
                    ProductId = s.ProductId,
                    SellerId = s.SellerId,
                    StartTime = s.StartTime,
                    EndTime = s.EndTime,
                    StartPrice = s.StartPrice,
                    CurrentPrice = s.CurrentPrice,
                    CategoryId = s.CategoryId,
                })
                .ToListAsync();
        }

        // Get Seller Listing by ID
        public async Task<SellerListingResponseDTO?> GetSellerListingByIdAsync(string id)
        {
            var listing = await _context.Listings
                .Include(s => s.Product)
                .Include(s => s.Category)
                .Include(s => s.Seller)
                .Include(s => s.Bids)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (listing == null) return null;

            return new SellerListingResponseDTO
            {
                Id = listing.Id,
                ProductId = listing.ProductId,
                SellerId = listing.SellerId,
                StartTime = listing.StartTime,
                EndTime = listing.EndTime,
                StartPrice = listing.StartPrice,
                CurrentPrice = listing.CurrentPrice,
                CategoryId = listing.CategoryId,
            };
        }

        // Add new Seller Listing with Product check
        public async Task<SellerListingResponseDTO> CreateSellerListingAsync(SellerListingResponseDTO dto, ProductResponseDTO product)
        {
            // Thêm sản phẩm vào database và lấy product Id
            var createdProduct = await CreateProductAsync(product);
            dto.ProductId = createdProduct.Id; // Thiết lập ProductId trong DTO

            // Tạo Id cho listing
            int listingCount = await _context.Listings.CountAsync();
            dto.Id = (listingCount + 1).ToString(); // Chuyển đổi thành chuỗi nếu Id là kiểu string

            // Tạo mới listing với ProductId của product đã được thêm vào
            Listing listing = new Listing
            {
                Id = dto.Id,
                ProductId = createdProduct.Id, // Sử dụng Id của Product vừa được tạo
                SellerId = dto.SellerId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                StartPrice = dto.StartPrice,
                CurrentPrice = dto.CurrentPrice,
                CategoryId = dto.CategoryId
            };

            // Thêm listing vào database
            _context.Listings.Add(listing);
            await _context.SaveChangesAsync();

            return dto;
        }




        // Update existing Seller Listing and related Product
        public async Task<SellerListingResponseDTO> UpdateSellerListingAsync(string id, SellerListingResponseDTO dto)
        {
            var listing = await _context.Listings.Include(l => l.Product).FirstOrDefaultAsync(l => l.Id == id);
            if (listing == null) return null;

            // Cập nhật thông tin Listing
            listing.StartTime = dto.StartTime;
            listing.EndTime = dto.EndTime;
            listing.StartPrice = dto.StartPrice;
            listing.CurrentPrice = dto.CurrentPrice;
            listing.CategoryId = dto.CategoryId;

            _context.Listings.Update(listing);
            await _context.SaveChangesAsync();
            return dto;
        }

        // Delete Seller Listing by ID and handle orphaned Product
        public async Task<SellerListingResponseDTO?> DeleteSellerListingAsync(string id)
        {
            // Tìm Listing và include Product, Category, Seller, và Bids để lấy đầy đủ dữ liệu
            var listing = await _context.Listings
                .Include(l => l.Product)
                .Include(l => l.Category)
                .Include(l => l.Seller)
                .Include(l => l.Bids)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (listing == null) return null;

            // Tạo DTO để lưu thông tin Listing trước khi xóa
            var deletedListingDTO = new SellerListingResponseDTO
            {
                Id = listing.Id,
                ProductId = listing.ProductId,
                SellerId = listing.SellerId,
                StartTime = listing.StartTime,
                EndTime = listing.EndTime,
                StartPrice = listing.StartPrice,
                CurrentPrice = listing.CurrentPrice,
                CategoryId = listing.CategoryId,
            };

            _context.Listings.Remove(listing);
            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();
            DeleteProductAsync(deletedListingDTO.ProductId);
            // Trả về DTO của Listing đã xóa
            return deletedListingDTO;
        }
        public async Task<List<SellerListingResponseDTO>> GetListingsBySellerIdAsync(string sellerId)
        {
            return await _context.Listings
                .Where(l => l.SellerId == sellerId)
                .Select(l => new SellerListingResponseDTO
                {
                    Id = l.Id,
                    ProductId = l.ProductId,
                    SellerId = l.SellerId,
                    StartTime = l.StartTime,
                    EndTime = l.EndTime,
                    StartPrice = l.StartPrice,
                    CurrentPrice = l.CurrentPrice,
                    CategoryId = l.CategoryId
                })
                .ToListAsync();
        }
//OrderManagement
        public async Task<List<OrderResponseDTO>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Include(o => o.User)
                .Select(o => new OrderResponseDTO
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    OrderDate = o.OrderDate,
                    ShippingAddress = o.ShippingAddress,
                    TotalAmount = o.TotalAmount,
                    OrderStatus = o.OrderStatus
                })
                .ToListAsync();
        }

        public async Task<OrderResponseDTO?> GetOrderByIdAsync(string id)
        {
            var order = await _context.Orders
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return null;

            return new OrderResponseDTO
            {
                Id = order.Id,
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                TotalAmount = order.TotalAmount,
                OrderStatus = order.OrderStatus
            };
        }

        public async Task<List<OrderItemResponseDTO>> GetOrderItemsByOrderIdAsync(string orderId)
        {
            return await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .Select(oi => new OrderItemResponseDTO
                {
                    Id = oi.Id,
                    OrderId = oi.OrderId,
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    Price = oi.Price,
                })
                .ToListAsync();
        }

        public async Task<OrderResponseDTO?> UpdateOrderAsync(string id, OrderResponseDTO orderUpdate)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order == null) return null;

            order.OrderStatus = orderUpdate.OrderStatus;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return orderUpdate;
        }

        public async Task<OrderResponseDTO?> CalculateOrderAsync(string id,  OrderResponseDTO orderUpdate)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == order.UserId);
            var orderItems = await _context.OrderItems.Where(oi => oi.OrderId == id).ToListAsync();

            if (order == null || user == null) return null;

            // Khởi tạo lại TotalAmount về 0 trước khi tính toán lại
            order.TotalAmount = 0;

            // Tính toán lại TotalAmount từ các OrderItem
            foreach (var item in orderItems)
            {
                if (item.Price.HasValue && item.Quantity.HasValue)  // Đảm bảo giá trị không null
                {
                    order.TotalAmount += item.Price.Value * item.Quantity.Value;
                }
            }

            // Cập nhật ShippingAddress từ địa chỉ người dùng
            order.ShippingAddress = user.Address;

            // Cập nhật đơn hàng vào cơ sở dữ liệu
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return orderUpdate;
        }



        public async Task<bool?> DeleteOrderAsync(string id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)  // Bao gồm cả OrderItems
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return null;

            // Xóa tất cả các OrderItem liên quan
            _context.OrderItems.RemoveRange(order.OrderItems);

            // Xóa đơn hàng
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }
        //Promotion

        public async Task<List<PromotionResponseDTO>> GetAllPromotionsAsync()
        {
            return await _context.Promotions
                .Include(o => o.Product)
                .Select(o => new PromotionResponseDTO
                {
                    Id = o.Id,
                    ProductId = o.ProductId,
                    PrValue = o.PrValue,
                    PrDescription = o.PrDescription            
                })
                .ToListAsync();
        }

        public async Task<List<PromotionResponseDTO>> GetPromotionsByProductIdAsync(string productId)
        {
            return await _context.Promotions
                .Where(p => p.ProductId == productId)
                .Select(p => new PromotionResponseDTO
                {
                    Id = p.Id,
                    PrValue = p.PrValue,
                    PrDescription = p.PrDescription,
                    ProductId = p.ProductId
                })
                .ToListAsync();
        }

        // Thêm mới khuyến mãi
        public async Task<PromotionResponseDTO> AddPromotionAsync(PromotionResponseDTO promotionDto)
        {
            var promotion = new Promotion
            {
                Id = promotionDto.Id,
                PrValue = promotionDto.PrValue,
                PrDescription = promotionDto.PrDescription,
                ProductId = promotionDto.ProductId
            };

            _context.Promotions.Add(promotion);
            await _context.SaveChangesAsync();

            return promotionDto;
        }

        // Cập nhật khuyến mãi
        public async Task<PromotionResponseDTO?> UpdatePromotionAsync(string id, PromotionResponseDTO promotionDto)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null) return null;

            promotion.PrValue = promotionDto.PrValue;
            promotion.PrDescription = promotionDto.PrDescription;
            promotion.ProductId = promotionDto.ProductId;

            _context.Promotions.Update(promotion);
            await _context.SaveChangesAsync();

            return promotionDto;
        }

        // Xóa khuyến mãi
        public async Task<bool> DeletePromotionAsync(string id)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null) return false;

            _context.Promotions.Remove(promotion);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
