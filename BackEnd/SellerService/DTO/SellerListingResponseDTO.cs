using DataBusiness_.Models;

namespace SellerService.DTO
{
    public class SellerListingResponseDTO
    {
        public string Id { get; set; } = null!;
        public string? ProductId { get; set; }
        public string? SellerId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public decimal? StartPrice { get; set; }
        public decimal? CurrentPrice { get; set; }
        public string? CategoryId { get; set; }
    }
}
