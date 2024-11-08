using DataBusiness_.Models;

namespace SellerService.DTO
{
    public class PromotionResponseDTO
    {
        public string Id { get; set; } = null!;
        public double? PrValue { get; set; }
        public string? PrDescription { get; set; }
        public string? ProductId { get; set; }
    }
}
