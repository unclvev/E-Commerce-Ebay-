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
        public async Task<SellerListingResponseDTO> CreateSellerListingAsync(SellerListingResponseDTO dto)
        {
            // Tính số lượng sản phẩm hiện có để xác định Id mới
            int listingCount = await _context.Listings.CountAsync();
            dto.Id = (listingCount + 1).ToString(); // Chuyển đổi thành chuỗi nếu Id là kiểu string

            Listing listing = new Listing
            {
                Id = dto.Id,
                ProductId = dto.ProductId,
                SellerId = dto.SellerId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                StartPrice = dto.StartPrice,
                CurrentPrice = dto.CurrentPrice,
                CategoryId = dto.CategoryId
            };

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
            listing.SellerId = dto.SellerId;
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

            // Trả về DTO của Listing đã xóa
            return deletedListingDTO;
        }
    }
}
